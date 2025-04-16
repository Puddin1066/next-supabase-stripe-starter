
# 🚀 Deployment Prompt Pack for Penile Curvature Inference SaaS

> 📦 This guide finalizes your MicrosaaS deployment using Supabase, Stripe, and Vercel

---

### Prompt 1: Create a Supabase Project
- Go to [Supabase](https://supabase.com/) and create a new project
- Set a strong password for the database (store in `.env.local` as `SUPABASE_DB_PASSWORD`)
- Save your `SUPABASE_URL`, `ANON_KEY`, and `SERVICE_ROLE_KEY` from project settings

---

### Prompt 2: Run SQL Migrations
- Navigate to `supabase/migrations/` folder
- Use Supabase CLI:
```bash
supabase db push
```
- Alternatively, run SQL from `supabase/seed.sql` manually in the Supabase SQL editor

---

### Prompt 3: Enable Supabase Storage
- In the Supabase dashboard, go to “Storage” → “Create Bucket”
- Name: `user-submissions`, set visibility to **private**

---

### Prompt 4: Setup Supabase Auth
- Under “Authentication” → “Settings” → Enable email signups and magic links (optional)
- Add additional metadata via JWT hooks if Stripe sync is required

---

### Prompt 5: Set Up a Stripe Account
- Go to [Stripe](https://dashboard.stripe.com/) and sign up or log in
- Navigate to “Products” and create:
  - A new product: e.g. "Penile Curvature Analyzer"
  - Price: $10/month, recurring billing

---

### Prompt 6: Retrieve Stripe API Keys
- Copy **Publishable Key** and **Secret Key** from Stripe Developer settings
- Add to `.env.local` as:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
```

---

### Prompt 7: Add Stripe Webhook Secret
- Create a webhook endpoint: `https://your-vercel-domain/api/stripe/webhook`
- Subscribe to:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Copy `whsec_...` and store as `STRIPE_WEBHOOK_SECRET`

---

### Prompt 8: Populate Environment Variables
Update `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DB_PASSWORD=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

---

### Prompt 9: Vercel Project Setup
- Go to [Vercel](https://vercel.com/)
- Import your GitHub repo
- Choose framework: **Next.js**
- Link environment variables from `.env.local` in the Vercel dashboard

---

### Prompt 10: Vercel Deployment Configuration
- Set Build Command: `npm run build`
- Set Output Directory: `.next`
- Ensure all secrets are securely passed via Vercel settings

---

### Prompt 11: Optional Domain Setup
- In Vercel → Domains → Add Custom Domain if needed
- Update DNS or buy domain via Vercel

---

### Prompt 12: Post-Deploy Hook
- Add webhook from Vercel to Slack or Discord to receive deploy notifications

---

### Prompt 13: Production Testing
- Go to deployed app
- Register new user, subscribe via Stripe checkout, upload image, view results

---

### Prompt 14: Monitoring
- Set up [LogRocket](https://logrocket.com/) or [Sentry](https://sentry.io/) for client-side + server error capture

---

### Prompt 15: Stripe Logs
- Monitor all webhook events in Stripe Dashboard → Developers → Webhooks

---

### Prompt 16: Supabase Logs
- Use Supabase → Logs → Database + Auth to review app behavior

---

### Prompt 17: Production Rollout Checklist
- ✅ Supabase deployed and database schema verified
- ✅ Stripe subscriptions tested and live keys configured
- ✅ All endpoints protected by auth and payment gate
- ✅ Web app responsive and error-logged

---

### Prompt 18: Create Public Landing Page
- Add `/pages/index.tsx` with product description and Stripe Checkout CTA

---

### Prompt 19: Limit Access by Plan
- Optionally use Supabase user metadata to store Stripe plan type

---

### Prompt 20: Celebrate Launch 🎉
- You're live. Start sharing. Measure feedback. Iterate.

---
