import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface DataPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

export function DataPagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  siblingsCount = 1,
}: DataPaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Generate page numbers array with ellipsis
  const generatePagination = () => {
    // Always include first page
    const pagination: (number | string)[] = [1];

    // Calculate range around current page
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages - 1);

    // Add ellipsis indicators and page numbers
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Handle left side
    if (shouldShowLeftDots) {
      pagination.push('...');
    } else if (totalPages > 1) {
      // If we don't show left dots but there are pages between 1 and leftSiblingIndex
      for (let i = 2; i < leftSiblingIndex; i++) {
        pagination.push(i);
      }
    }

    // Add pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pagination.push(i);
    }

    // Handle right side
    if (shouldShowRightDots) {
      pagination.push('...');
    } else if (rightSiblingIndex < totalPages) {
      // If we don't show right dots but there are pages between rightSiblingIndex and totalPages
      for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
        pagination.push(i);
      }
    }

    // Always include last page if it's not already included
    if (totalPages > 1 && !pagination.includes(totalPages)) {
      pagination.push(totalPages);
    }

    return pagination;
  };

  const paginationArray = generatePagination();

  return (
    <div className="flex flex-col items-center space-y-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)} 
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              size="default"
            />
          </PaginationItem>
          
          {paginationArray.map((page, index) => {
            if (page === '...') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink 
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page as number)}
                  className="cursor-pointer"
                  size="default"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)} 
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              size="default"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <div className="text-sm text-muted-foreground">
        Showing page {currentPage} of {totalPages} ({totalItems} items)
      </div>
    </div>
  );
}
