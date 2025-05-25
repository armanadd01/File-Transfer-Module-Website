'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function BrandingPage() {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 pt-[5vh] min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Brand</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Free plan</Badge>
            <Button>Upgrade</Button>
          </div>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Create a branded transfer portal of your own</CardTitle>
            <CardDescription>Make your transfers stand out with your own logo, background, and colors. Link to a custom domain, and get started with branding.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg">Upgrade</Button>
          </CardContent>
        </Card>

        <div className="space-y-12">
          <Card>
            <CardHeader>
              <CardTitle>Edit your images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label>Logo</Label>
                  <Button
                    variant="outline"
                    className="h-32 w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </Button>
                  <p className="text-sm text-muted-foreground">Recommended size: 200x200px</p>
                </div>

                <div className="space-y-4">
                  <Label>Background</Label>
                  <Button
                    variant="outline"
                    className="h-32 w-full hover:bg-accent hover:text-accent-foreground"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </Button>
                  <p className="text-sm text-muted-foreground">Recommended size: 1920x1080px</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get more from your workspace</CardTitle>
              <CardDescription>Upgrade to create a custom URL and enable creative tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg">Upgrade</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
