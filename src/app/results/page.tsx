import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function ResultsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session }, error: authError } = await supabase.auth.getSession();
  if (authError || !session) {
    redirect('/login');
  }

  const { data: submissions, error: submissionsError } = await supabase
    .from('submissions')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (submissionsError) {
    console.error('Error fetching submissions:', submissionsError);
    return <div>Error loading results</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Analysis History</h1>
      
      <div className="grid gap-6">
        {submissions?.map((submission) => (
          <div
            key={submission.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64">
                <Image
                  src={submission.image_url}
                  alt="Analysis result"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Analysis Results</h3>
                  <p className="text-gray-600">
                    Analyzed on {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p>
                    Angle: {submission.result_json.angle.toFixed(2)}°
                  </p>
                  <p>
                    Confidence: {(submission.result_json.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {submissions?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No analysis results yet</p>
          </div>
        )}
      </div>
    </div>
  );
} 