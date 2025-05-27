'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals and small teams getting started.',
    price: 0,
    features: [
      'Up to 2GB per transfer',
      '7 days file retention',
      'Basic email notifications',
      'Web access only',
    ],
    current: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals who need more power and flexibility.',
    price: 12,
    features: [
      'Up to 20GB per transfer',
      '30 days file retention',
      'Advanced tracking & analytics',
      'Password protection',
      'Custom branding',
      'API access',
    ],
    current: false,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For teams that need advanced features and support.',
    price: 23,
    features: [
      'Unlimited transfer size',
      '90 days file retention',
      'Advanced security features',
      'Team management',
      'Priority support',
      'All integrations included',
      'Custom workflows',
      'Audit logs',
    ],
    current: false,
  },
];

export default function PlansPage() {
  const router = useRouter();

  const handleUpgrade = (planId: string) => {
    router.push(`/payment?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Plans & Pricing</h1>
          <p className="text-muted-foreground mt-2">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className={plan.current ? 'border-primary' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  {plan.current && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-0">
                      Current Plan
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-primary shrink-0"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {plan.current ? (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      Upgrade to {plan.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-muted-foreground mb-6">
            Contact us for a tailored solution that meets your specific requirements.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
