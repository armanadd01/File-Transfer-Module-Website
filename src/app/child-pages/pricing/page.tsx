"use client";

import React from "react";

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
    <div className="p-8 bg-white dark:bg-gray-800 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">You&apos;ve got the ideas,<br />we&apos;ve got the plans</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Whether you&apos;re transferring files for a one-time project or creating<br />a brand with WeTransfer, we&apos;ve got you covered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-lg border ${
                plan.highlight
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800 transition-all duration-150`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-2 text-gray-500 dark:text-gray-400">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors duration-150 ${
                  plan.buttonVariant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white'
                    : 'border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-lg bg-gray-50 dark:bg-gray-700 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Other plans</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Share one large file</p>
          <div className="flex justify-center items-center gap-4">
            <div className="text-left">
              <div className="text-sm text-gray-500 dark:text-gray-400">Share up to 100 GB / month</div>
              <div className="font-semibold text-gray-900 dark:text-white">$9</div>
            </div>
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg text-gray-700 dark:text-gray-300 transition-colors duration-150">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
