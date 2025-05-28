"use client"

import React from "react"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatFileSize } from "@/lib/api"
import { Transfer } from "@/types"

interface ViewTransferDialogProps {
  isOpen: boolean
  onClose: () => void
  transfer: Transfer | null
}

export function ViewTransferDialog({
  isOpen,
  onClose,
  transfer,
}: ViewTransferDialogProps) {
  if (!transfer) return null

  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'downloaded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'deleted': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden flex flex-col bg-background">
        <div className="flex flex-col h-full overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
            <DialogTitle>Transfer Details</DialogTitle>
            <DialogDescription>
              Detailed information about this transfer.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{transfer.title}</h3>
                <Badge className={getStatusColor(transfer.status)}>
                  {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">File Name</p>
                  <p className="font-medium">{transfer.fileName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium">{formatFileSize(transfer.fileSize)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Recipients</p>
                <div className="space-y-1">
                  {transfer.recipients.map((recipient) => (
                    <div key={recipient.id} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <p>{recipient.email}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Created</p>
                <p>{new Date(transfer.createdAt).toLocaleString()}</p>
              </div>
              
              {transfer.expiresAt && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Expires</p>
                  <p>{new Date(transfer.expiresAt).toLocaleString()}</p>
                </div>
              )}
              
              {transfer.message && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="whitespace-pre-wrap">{transfer.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
