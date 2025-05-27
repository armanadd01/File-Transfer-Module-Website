'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const integrations = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send files directly to Slack channels and receive notifications.',
    icon: '🔔',
    enabled: false,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Automatically backup your transfers to Dropbox.',
    icon: '📦',
    enabled: true,
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Save your transfers directly to Google Drive.',
    icon: '📁',
    enabled: false,
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Share files in Teams channels and chats.',
    icon: '💬',
    enabled: false,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate your workflow with custom Zaps.',
    icon: '⚡',
    enabled: false,
  },
];

export default function IntegrationsPage() {
  const [enabledIntegrations, setEnabledIntegrations] = React.useState(
    integrations.reduce((acc, integration) => ({
      ...acc,
      [integration.id]: integration.enabled,
    }), {})
  );

  const handleToggle = (id: string) => {
    setEnabledIntegrations(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services.</p>
        </div>

        <div className="grid gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <CardTitle>{integration.name}</CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch
                      id={integration.id}
                      checked={enabledIntegrations[integration.id]}
                      onCheckedChange={() => handleToggle(integration.id)}
                    />
                    <Button variant="outline" disabled={!enabledIntegrations[integration.id]}>
                      Configure
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {enabledIntegrations[integration.id] && (
                <CardContent>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-2">Integration Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Notify on transfer completion</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Auto-sync files</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
