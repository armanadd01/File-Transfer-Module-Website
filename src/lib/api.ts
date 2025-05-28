import { Transfer, TransferHistory, Review } from '@/types';
import { sentTransfers, receivedTransfers, transferHistory, reviews } from '@/data';

// This file simulates API calls to fetch data
// In a real application, these would be actual API calls to a backend server

/**
 * Fetch sent transfers with pagination and filtering
 */
export async function fetchSentTransfers({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Transfer[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...sentTransfers];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(transfer => 
      transfer.title.toLowerCase().includes(query) || 
      transfer.fileName.toLowerCase().includes(query) ||
      transfer.recipients.some(r => r.email.toLowerCase().includes(query))
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Fetch received transfers with pagination and filtering
 */
export async function fetchReceivedTransfers({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Transfer[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...receivedTransfers];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(transfer => 
      transfer.title.toLowerCase().includes(query) || 
      transfer.fileName.toLowerCase().includes(query) ||
      transfer.sender.email.toLowerCase().includes(query)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Fetch transfer history with pagination and filtering
 */
export async function fetchTransferHistory({
  page = 1,
  limit = 10,
  search = '',
  timeRange = 'all',
}: {
  page?: number;
  limit?: number;
  search?: string;
  timeRange?: string;
}): Promise<{ data: TransferHistory[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...transferHistory];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.fileName.toLowerCase().includes(query) ||
      item.sender.email.toLowerCase().includes(query) ||
      item.recipients.some(r => r.email.toLowerCase().includes(query))
    );
  }
  
  // Apply time range filter
  if (timeRange !== 'all') {
    const days = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.lastActivity);
      return itemDate >= cutoffDate;
    });
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Fetch reviews with pagination and filtering
 */
export async function fetchReviews({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Review[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...reviews];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(review => 
      review.title.toLowerCase().includes(query) || 
      review.description.toLowerCase().includes(query) ||
      review.collaborators.some(c => c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query))
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}
