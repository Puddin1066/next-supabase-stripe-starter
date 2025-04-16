
# 📦 Penile Curvature Inference SaaS – Integration Prompt Pack

> ⚙️ Target stack: `next-supabase-stripe-starter` + YOLOv8 + Supabase + Stripe + Vercel  
> 🎯 Goal: Deploy a paid, login-gated image inference microsaas via Vercel

---

### Prompt 1: Setup Inference Server Logic
**Add a YOLOv8 inference handler to `/src/utils/infer.ts`**  
```ts
import { spawn } from 'child_process';
export const runInference = async (imagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const py = spawn('python3', ['path/to/your/infer.py', imagePath]);
    let result = '';
    py.stdout.on('data', data => result += data.toString());
    py.stderr.on('data', err => console.error('stderr:', err.toString()));
    py.on('close', () => resolve(result.trim()));
  });
};
```

---

### Prompt 2: Upload Endpoint
**Create `/pages/api/upload.ts` to handle image uploads and trigger inference.**

---

### Prompt 3: Supabase Storage Integration
**Use Supabase Storage to persist user-uploaded images and inference results.**
- Bucket: `user-submissions`
- Save result JSON per user for dashboard retrieval.

---

### Prompt 4: Add Auth Middleware
**Gate upload + inference route access with Supabase user session token validation middleware in `/src/middleware.ts`.**

---

### Prompt 5: Add Stripe Subscription Check
**In the same middleware, validate if the user has an active Stripe subscription. Use Supabase metadata or direct API check.**

---

### Prompt 6: Stripe Webhook
**Create `/pages/api/stripe/webhook.ts` to sync subscription events to Supabase.**
```ts
// Respond to customer.subscription.updated or .deleted events.
```

---

### Prompt 7: Upload UI
**Create a React component `/components/UploadForm.tsx` for image upload + submission to the API route.**

---

### Prompt 8: Auth UI
**Use Supabase Auth UI (already in repo) to gate access to Upload + Results pages.**

---

### Prompt 9: Results Dashboard
**Create `/pages/results.tsx` to display inference history using Supabase queries.**

---

### Prompt 10: Model Weights in Vercel
**Bundle small `yolov8n` model OR use remote endpoint (e.g. HuggingFace Spaces, Modal.com).**
- If too large, use inference proxy via serverless function.

---

### Prompt 11: Model Inference Python Script
**Add `infer.py` in root to handle YOLOv8 model loading + result parsing.**

---

### Prompt 12: API Environment Variables
Add the following to `.env.local` and Vercel dashboard:
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_PASSWORD=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

### Prompt 13: Add Payment Wall Logic
**Wrap upload page with Stripe payment gate component:**
```tsx
if (!userHasActivePlan) return <UpgradePrompt />;
```

---

### Prompt 14: Add Pricing Page
**Use `/pages/pricing.tsx` to sell $10/month plan. Tie to Stripe Product ID.**

---

### Prompt 15: Define Supabase DB Schema
```sql
create table submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  image_url text,
  result_json jsonb,
  created_at timestamp default now()
);
```

---

### Prompt 16: Handle Public Stripe Checkout
**Use `/pages/api/stripe/checkout.ts` to generate session and redirect.**

---

### Prompt 17: Rate Limiting
**Add backend limiter to prevent abuse (e.g. max 5 uploads/min/user). Store counts in Supabase or memory.**

---

### Prompt 18: Add Error Tracking
**Install Sentry or LogRocket to capture inference errors and edge deployment crashes.**

---

### Prompt 19: Add Image Preview w/ Overlay
**Display results visually in `/components/ResultsCard.tsx` using HTML canvas to show keypoints/angles.**

---

### Prompt 20: Deployment Check
**Confirm Vercel settings:**
- Build command: `npm run build`
- Output: `.next`
- Env variables: copied from local `.env.local`
- Add post-deploy hook to notify Slack/email

---

> 💡 Tip: Use `pnpm` instead of `npm` for faster builds if using larger packages (e.g., image-processing).
