'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CookiePreference {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

const defaultPreferences: CookiePreference[] = [
  {
    id: 'necessary',
    name: 'Strictly Necessary',
    description: 'These cookies are essential for the website to function properly.',
    required: true,
    enabled: true,
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'These cookies enable personalized features and save your preferences.',
    required: false,
    enabled: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'These cookies help us understand how visitors interact with our website.',
    required: false,
    enabled: true,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'These cookies are used to deliver relevant advertisements.',
    required: false,
    enabled: false,
  },
];

export default function CookiePreferencesPage() {
  const [preferences, setPreferences] = useState<CookiePreference[]>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleToggle = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id && !pref.required ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const handleAcceptAll = () => {
    const updatedPreferences = preferences.map(pref => ({
      ...pref,
      enabled: true,
    }));
    setPreferences(updatedPreferences);
    localStorage.setItem('cookiePreferences', JSON.stringify(updatedPreferences));
    localStorage.setItem('cookiesAccepted', 'true');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cookie Preferences</CardTitle>
            <CardDescription>
              Manage how we use cookies to improve your experience on our website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {preferences.map((preference) => (
                <div
                  key={preference.id}
                  className="flex items-start justify-between space-x-4 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={preference.id} className="font-medium">
                        {preference.name}
                      </Label>
                      {preference.required && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {preference.description}
                    </p>
                  </div>
                  <Switch
                    id={preference.id}
                    checked={preference.enabled}
                    onCheckedChange={() => handleToggle(preference.id)}
                    disabled={preference.required}
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={handleAcceptAll}>
                  Accept all
                </Button>
                <Button onClick={handleSave}>
                  Save preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
