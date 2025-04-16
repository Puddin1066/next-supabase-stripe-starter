import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { runInference } from '@/utils/infer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check subscription status
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', session.user.id)
      .single();

    if (!subscription || subscription.status !== 'active') {
      return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExt}`;
    
    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = path.join('/tmp', fileName);
    await writeFile(tempPath, buffer);

    // Run inference
    const inferenceResult = await runInference(tempPath);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user-submissions')
      .upload(`${session.user.id}/${fileName}`, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-submissions')
      .getPublicUrl(`${session.user.id}/${fileName}`);

    // Save submission to database
    const { error: dbError } = await supabase
      .from('submissions')
      .insert({
        user_id: session.user.id,
        image_url: publicUrl,
        result_json: inferenceResult
      });

    if (dbError) {
      throw dbError;
    }

    return NextResponse.json({
      success: true,
      result: inferenceResult,
      imageUrl: publicUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 