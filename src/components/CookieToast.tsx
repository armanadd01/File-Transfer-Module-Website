'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';

export function CookieToast() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleManage = () => {
    router.push('/cookie-preferences');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              We use cookies to personalize your experience. By continuing to visit this website you agree to our use of cookies.{' '}
              <button
                onClick={handleManage}
                className="text-primary hover:underline"
              >
                Learn more
              </button>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleManage}
                className="text-sm"
              >
                Manage preferences
              </Button>
              <Button
                onClick={handleAccept}
                className="text-sm"
              >
                Accept all
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
