'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchReviews } from '@/lib/api';
import { Review } from '@/types';
import { DataPagination } from '@/components/ui/data-pagination';
import { CreateReviewDialog } from '@/components/dialogs/create-review-dialog';

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateReviewDialogOpen, setIsCreateReviewDialogOpen] = useState(false);
  const itemsPerPage = 8;
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleCreateReview = () => {
    setIsCreateReviewDialogOpen(true);
  };
  
  const handleSaveReview = (newReview: Partial<Review>) => {
    // In a real app, this would call an API to create the review
    // For now, we'll just update the local state
    setReviewsData([newReview as Review, ...reviewsData]);
    setTotalItems(totalItems + 1);
    setIsCreateReviewDialogOpen(false);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const loadReviewsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchReviews({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery
      });
      setReviewsData(result.data);
      setTotalItems(result.total);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery]);
  
  useEffect(() => {
    loadReviewsData();
  }, [loadReviewsData]);
  
  // Calculate pagination info
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="p-8 bg-white dark:bg-gray-800 min-h-screen pt-[5vh] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to fast, focused feedback</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Here&apos;s what our customers are saying about us:</p>
        </div>
        
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search reviews..."
            className="w-full max-w-md mx-auto"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Video - 26 sec</h3>
                  <p className="text-sm text-muted-foreground">A small intro to portals and reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Read the full documentation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Support</h3>
                  <p className="text-sm text-muted-foreground">Visit our help center</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Reviews</h2>
          
          <div className="rounded-md border mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Collaborators</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : reviewsData.length > 0 ? (
                  reviewsData.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.title}</TableCell>
                      <TableCell>{formatDate(review.createdAt)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(review.status)}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{review.collaborators.length}</TableCell>
                      <TableCell>{review.files.length}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No reviews found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <DataPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card className="hover:border-primary/50 cursor-pointer transition-colors" onClick={handleCreateReview}>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <CardTitle className="text-sm mb-1">Create review</CardTitle>
                <CardDescription className="text-xs">to get feedback on your work</CardDescription>
              </CardContent>
            </Card>
          </div>
          
          {/* Create Review Dialog */}
          <CreateReviewDialog
            isOpen={isCreateReviewDialogOpen}
            onClose={() => setIsCreateReviewDialogOpen(false)}
            onSave={handleSaveReview}
          />
        </div>
      </div>
    </div>
  );
}
