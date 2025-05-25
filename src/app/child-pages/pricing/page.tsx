"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Perfect for occasional users",
    price: "$0",
    period: "forever",
    features: [
      "Share up to 3 GB / month",
      "3 transfers per month",
      "Transfer up to 3 GB",
      "Perfect for first time use"
    ],
    buttonText: "Get started",
    buttonVariant: "outline"
  },
  {
    name: "Ultimate",
    description: "Perfect for power users",
    price: "$20",
    period: "per month",
    features: [
      "Everything in Free, plus:",
      "Up to 10 transfers / month",
      "Transfer up to 10 GB",
      "Password protection",
      "Email notifications",
      "Link expiration",
      "Download tracking"
    ],
    buttonText: "Get started",
    buttonVariant: "outline",
    highlight: true
  },
  {
    name: "Teams",
    description: "Perfect for small teams",
    price: "$10",
    period: "per month",
    features: [
      "Everything in Ultimate, plus:",
      "Extra team members",
      "Up to 25 transfers / month",
      "Collaborative folders",
      "Custom branding"
    ],
    buttonText: "Get started",
    buttonVariant: "outline"
  },
  {
    name: "Enterprise",
    description: "Call us for a custom quote",
    price: "Custom",
    period: "",
    features: [
      "Everything in Teams, plus:",
      "Unlimited members",
      "Custom domain",
      "Dedicated support",
      "Custom features",
      "API access",
      "Single sign-on (SSO)",
      "Advanced reports",
      "Enterprise-grade support"
    ],
    buttonText: "Contact us",
    buttonVariant: "outline"
  }
];

export default function PricingPage() {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 min-h-screen pt-[5vh] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">You&apos;ve got the ideas,<br />we&apos;ve got the plans</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Whether you&apos;re transferring files for a one-time project or creating<br />a brand with WeTransfer, we&apos;ve got you covered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative",
                plan.highlight && "border-2 border-primary shadow-lg"
              )}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-2 text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-16">
          <CardHeader>
            <CardTitle>Other plans</CardTitle>
            <CardDescription>Share one large file</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-4">
              <div className="text-left">
                <div className="text-sm text-muted-foreground">Share up to 100 GB / month</div>
                <div className="font-semibold">$9</div>
              </div>
              <Button variant="outline">Continue</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
