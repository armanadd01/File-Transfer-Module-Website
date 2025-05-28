'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchTransferHistory, formatFileSize } from '@/lib/api';
import { TransferHistory } from '@/types';
import { DataPagination } from '@/components/ui/data-pagination';

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [historyData, setHistoryData] = useState<TransferHistory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    setCurrentPage(1); // Reset to first page on time range change
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'downloaded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  const getActivityBadgeClass = (activity: string) => {
    switch (activity) {
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'received': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'downloaded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'forwarded': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const loadHistoryData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchTransferHistory({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        timeRange: timeRange
      });
      setHistoryData(result.data);
      setTotalItems(result.total);
    } catch (error) {
      console.error('Error loading transfer history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, timeRange]);
  
  useEffect(() => {
    loadHistoryData();
  }, [loadHistoryData]);
  
  // Calculate pagination info
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className=" pt-[5vh] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Transfer History</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage your past transfers</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="Search transfers..."
                className="max-w-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : historyData.length > 0 ? (
                  historyData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.lastActivity).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{formatFileSize(item.fileSize)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Badge className={getStatusBadgeClass(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                          <Badge className={getActivityBadgeClass(item.activityType)}>
                            {item.activityType.charAt(0).toUpperCase() + item.activityType.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No transfers found
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
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Need to send more files?</p>
          <Button size="lg">
            Start Transfer
          </Button>
        </div>
      </div>
    </div>
  );
}
