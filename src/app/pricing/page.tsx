import { cookies } from 'next/headers';
import Link from 'next/link';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function PricingPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Get started with our professional analysis service
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Free Trial</h2>
          <p className="text-gray-600 mb-6">
            Try our service with limited access
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              1 analysis per month
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Basic results
            </li>
          </ul>
          <Link
            href={session ? '/upload' : '/login'}
            className="block w-full text-center py-3 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {session ? 'Start Free Trial' : 'Sign Up'}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500">
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-tl-lg rounded-bl-lg">
            Popular
          </div>
          <h2 className="text-2xl font-bold mb-4">Professional</h2>
          <p className="text-gray-600 mb-6">
            Full access to all features
          </p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-gray-600">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Unlimited analyses
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Detailed results
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Priority support
            </li>
          </ul>
          <Link
            href={session ? '/api/stripe/checkout' : '/login'}
            className="block w-full text-center py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {session ? 'Subscribe Now' : 'Sign Up'}
          </Link>
        </div>
      </div>
    </div>
  );
}
