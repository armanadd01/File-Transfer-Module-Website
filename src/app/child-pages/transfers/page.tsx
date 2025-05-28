'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TransferUploadForm } from '@/components/forms/TransferUploadForm';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { fetchSentTransfers, fetchReceivedTransfers, formatFileSize } from '@/lib/api';
import { Transfer } from '@/types';
import { DataPagination } from '@/components/ui/data-pagination';
import { EditTransferDialog } from '@/components/dialogs/edit-transfer-dialog';
import { DeleteConfirmationDialog } from '@/components/dialogs/delete-confirmation-dialog';
import { ViewTransferDialog } from '@/components/dialogs/view-transfer-dialog';
import { ForwardTransferDialog } from '@/components/dialogs/forward-transfer-dialog';

export default function TransfersPage() {
  const [activeTab, setActiveTab] = useState('sent');
  const [searchQuery, setSearchQuery] = useState('');
  const [sentData, setSentData] = useState<Transfer[]>([]);
  const [receivedData, setReceivedData] = useState<Transfer[]>([]);
  const [sentTotal, setSentTotal] = useState(0);
  const [receivedTotal, setReceivedTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  
  // Dialog states
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset to first page on tab change
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Dialog handlers
  const handleEditTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setIsDeleteDialogOpen(true);
  };
  
  const handleViewTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setIsViewDialogOpen(true);
  };
  
  const handleForwardTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setIsForwardDialogOpen(true);
  };
  
  const handleSaveTransfer = (updatedTransfer: Partial<Transfer>) => {
    // In a real app, this would call an API to update the transfer
    // For now, we'll just update the local state
    if (activeTab === 'sent') {
      setSentData(sentData.map(t => t.id === updatedTransfer.id ? { ...t, ...updatedTransfer } as Transfer : t));
    } else if (activeTab === 'received') {
      setReceivedData(receivedData.map(t => t.id === updatedTransfer.id ? { ...t, ...updatedTransfer } as Transfer : t));
    }
    setIsEditDialogOpen(false);
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would call an API to delete the transfer
    // For now, we'll just update the local state
    if (activeTab === 'sent' && selectedTransfer) {
      setSentData(sentData.filter(t => t.id !== selectedTransfer.id));
      setSentTotal(sentTotal - 1);
    } else if (activeTab === 'received' && selectedTransfer) {
      setReceivedData(receivedData.filter(t => t.id !== selectedTransfer.id));
      setReceivedTotal(receivedTotal - 1);
    }
    setIsDeleteDialogOpen(false);
  };
  
  const handleForward = (emails: string[], message: string) => {
    // In a real app, this would call an API to forward the transfer
    console.log(`Forwarding transfer to: ${emails.join(', ')}
Message: ${message}`);
    setIsForwardDialogOpen(false);
  };
  
  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'downloaded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  const loadSentTransfers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchSentTransfers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery
      });
      setSentData(result.data);
      setSentTotal(result.total);
    } catch (error) {
      console.error('Error loading sent transfers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery]);
  
  const loadReceivedTransfers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchReceivedTransfers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery
      });
      setReceivedData(result.data);
      setReceivedTotal(result.total);
    } catch (error) {
      console.error('Error loading received transfers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery]);
  
  // Load initial data
  useEffect(() => {
    loadSentTransfers();
    loadReceivedTransfers();
  }, [loadSentTransfers, loadReceivedTransfers]);
  
  // Reload data when tab changes
  useEffect(() => {
    if (activeTab === 'sent') {
      loadSentTransfers();
    } else if (activeTab === 'received') {
      loadReceivedTransfers();
    }
  }, [activeTab, loadSentTransfers, loadReceivedTransfers]);
  
  // Calculate pagination info
  const totalPages = activeTab === 'sent' ? Math.ceil(sentTotal / itemsPerPage) : Math.ceil(receivedTotal / itemsPerPage);
  const currentTotal = activeTab === 'sent' ? sentTotal : receivedTotal;

  return (
    <div className="pt-[5vh] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-2 text-gray-900 dark:text-white">Transfers</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Check the download status or edit, forward or delete them</p>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8 ">
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
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <TabsContent value="sent">
                {isLoading ? (
                  <div className="py-16 text-center">
                    <CardTitle className="mb-2">Loading...</CardTitle>
                    <CardDescription>Please wait while we fetch your transfers</CardDescription>
                  </div>
                ) : sentData.length > 0 ? (
                  <>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sentData.map((transfer) => (
                            <TableRow key={transfer.id}>
                              <TableCell className="font-medium">{transfer.title}</TableCell>
                              <TableCell>{transfer.fileName}</TableCell>
                              <TableCell>{formatFileSize(transfer.fileSize)}</TableCell>
                              <TableCell>
                                {transfer.recipients.map((recipient) => (
                                  <div key={recipient.id} className="text-sm">
                                    {recipient.email}
                                  </div>
                                ))}
                              </TableCell>
                              <TableCell>{new Date(transfer.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(transfer.status)}>
                                  {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => handleViewTransfer(transfer)}>View</Button>
                                  <Button variant="outline" size="sm" onClick={() => handleEditTransfer(transfer)}>Edit</Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDeleteTransfer(transfer)}>Delete</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    <DataPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={currentTotal}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <CardTitle className="mb-2">No transfers found</CardTitle>
                    <CardDescription>Try adjusting your search criteria</CardDescription>
                  </div>
                )}
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
                {isLoading ? (
                  <div className="py-16 text-center">
                    <CardTitle className="mb-2">Loading...</CardTitle>
                    <CardDescription>Please wait while we fetch your transfers</CardDescription>
                  </div>
                ) : receivedData.length > 0 ? (
                  <>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Sender</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {receivedData.map((transfer) => (
                            <TableRow key={transfer.id}>
                              <TableCell className="font-medium">{transfer.title}</TableCell>
                              <TableCell>{transfer.fileName}</TableCell>
                              <TableCell>{formatFileSize(transfer.fileSize)}</TableCell>
                              <TableCell>{transfer.sender.email}</TableCell>
                              <TableCell>{new Date(transfer.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(transfer.status)}>
                                  {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => handleViewTransfer(transfer)}>View</Button>
                                  <Button variant="outline" size="sm">Download</Button>
                                  <Button variant="outline" size="sm" onClick={() => handleForwardTransfer(transfer)}>Forward</Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDeleteTransfer(transfer)}>Delete</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    <DataPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={currentTotal}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <CardTitle className="mb-2">No transfers found</CardTitle>
                    <CardDescription>Try adjusting your search criteria</CardDescription>
                  </div>
                )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialog Components */}
      <EditTransferDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        transfer={selectedTransfer}
        onSave={handleSaveTransfer}
      />
      
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Transfer"
        description="Are you sure you want to delete this transfer?"
        itemName={selectedTransfer?.title || ""}
      />
      
      <ViewTransferDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        transfer={selectedTransfer}
      />
      
      <ForwardTransferDialog
        isOpen={isForwardDialogOpen}
        onClose={() => setIsForwardDialogOpen(false)}
        transfer={selectedTransfer}
        onForward={handleForward}
      />
    </div>
  );
}
