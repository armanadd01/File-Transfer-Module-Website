'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  emailTo: z.string().email({
    message: "Please enter a valid email address.",
  }),
  yourEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  message: z.string(),
  expiresIn: z.string()
})

type FormValues = z.infer<typeof formSchema>

export const TransferUploadForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailTo: '',
      yourEmail: '',
      title: '',
      message: '',
      expiresIn: '7'
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Handle form submission here
  }

  return (
    <div className="max-w-md w-full min-h-[calc(100vh-11vh)] flex flex-col justify-center mx-auto space-y-6 transition-colors duration-150">
      <Card>
        <CardHeader>
          <CardTitle>Transfer Upload</CardTitle>
          <CardDescription>Upload files to transfer</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* File upload component can be added here */}
              <FormField
                control={form.control}
                name="emailTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email to</FormLabel>
                    <FormControl>
                      <Input placeholder="recipient@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yourEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Transfer title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add a message (optional)"
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiresIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires in</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiration time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                className="w-full" 
                variant={"default"} 
                size="lg"
                type="submit"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16v-4a4 4 0 014-4h10a4 4 0 014 4v4m-8-8l-2 2m0 0l2 2m-2-2h6m-6 0H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2h-1" />
                </svg>
                Upload Files
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
