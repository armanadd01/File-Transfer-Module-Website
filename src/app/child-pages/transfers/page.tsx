'use client';

import React from 'react';
import { TransferUploadForm } from '@/components/forms/TransferUploadForm';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export default function TransfersPage() {


  return (
    <div className="pt-[5vh] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-2 text-gray-900 dark:text-white">Transfers</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Check the download status or edit, forward or delete them</p>
        
        <Tabs defaultValue="sent" className="mb-8 ">
          <TabsList className="grid w-full grid-cols-3 mb-3 max-w-[400px]">
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="requested">Requested</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
          </TabsList>

          <div className="mb-8">
            <Input
              type="text"
              placeholder="Search by title, file name, or email"
              className="w-full"
            />
          </div>

          <TabsContent value="sent">
            <Card>
              <CardContent className="py-16 text-center">
                <CardTitle className="mb-2">All the transfers you send will appear here</CardTitle>
                <CardDescription>Check the download status or edit, forward or delete them</CardDescription>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requested">
            <Card>
              <CardContent>
                <div className="text-center mb-8">
                  <CardTitle className="mb-2">Find your file requests here</CardTitle>
                  <CardDescription>Request up to 3 GB transfers from anyone. Explain what you need, track activity, and manage uploads in one place.</CardDescription>
                </div>
                <TransferUploadForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="received">
            <Card>
              <CardContent className="py-16 text-center">
                <CardTitle className="mb-2">Files shared with you will appear here</CardTitle>
                <CardDescription>Download and manage the files you receive</CardDescription>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
