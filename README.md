# Penile Curvature Analysis SaaS

A Next.js application that provides AI-powered penile curvature analysis using YOLOv8, Supabase, and Stripe.

## Features

- 🔒 Secure authentication with Supabase
- 💳 Subscription management with Stripe
- 🤖 AI-powered image analysis using YOLOv8
- 📊 Results dashboard with analysis history
- 🎨 Modern, responsive UI

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Supabase account
- Stripe account
- Vercel account (for deployment)

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRICE_ID=your_stripe_price_id

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```

2. Set up Supabase:
   - Create a new project
   - Run the following SQL to create the required tables:
     ```sql
     create table submissions (
       id uuid primary key default uuid_generate_v4(),
       user_id uuid references auth.users(id),
       image_url text,
       result_json jsonb,
       created_at timestamp default now()
     );

     create table subscriptions (
       id uuid primary key default uuid_generate_v4(),
       user_id uuid references auth.users(id),
       stripe_subscription_id text,
       stripe_customer_id text,
       stripe_price_id text,
       status text,
       current_period_end timestamp with time zone,
       created_at timestamp default now()
     );
     ```

3. Set up Stripe:
   - Create a product and price in the Stripe dashboard
   - Set up a webhook endpoint at `/api/stripe/webhook`
   - Add the webhook secret to your environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Push your code to GitHub

2. Deploy to Vercel:
   - Connect your GitHub repository
   - Add all environment variables
   - Deploy

3. Set up the Python environment on Vercel:
   - Add a `vercel.json` file:
     ```json
     {
       "buildCommand": "npm run build",
       "installCommand": "npm install && pip install -r requirements.txt"
     }
     ```

## Usage

1. Sign up for an account
2. Choose a subscription plan
3. Upload an image for analysis
4. View results in the dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
