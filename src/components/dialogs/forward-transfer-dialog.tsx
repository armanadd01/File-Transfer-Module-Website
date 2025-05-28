"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Transfer } from "@/types"

interface ForwardTransferDialogProps {
  isOpen: boolean
  onClose: () => void
  transfer: Transfer | null
  onForward: (emails: string[], message: string) => void
}

export function ForwardTransferDialog({
  isOpen,
  onClose,
  transfer,
  onForward,
}: ForwardTransferDialogProps) {
  const [recipientEmails, setRecipientEmails] = useState("")
  const [message, setMessage] = useState("")

  const handleForward = () => {
    if (!transfer) return

    // Parse recipient emails
    const emails = recipientEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "")

    onForward(emails, message)
    onClose()
  }

  if (!transfer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex flex-col h-full overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
            <DialogTitle>Forward Transfer</DialogTitle>
            <DialogDescription>
              Forward this transfer to other recipients.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 py-4">
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Transfer Details:</p>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{transfer.title}</p>
                <p className="text-sm text-muted-foreground">
                  {transfer.fileName} ({formatFileSize(transfer.fileSize)})
                </p>
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipients" className="text-right">
                  Recipients
                </Label>
                <Input
                  id="recipients"
                  value={recipientEmails}
                  onChange={(e) => setRecipientEmails(e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="message" className="text-right pt-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a personal message..."
                  className="col-span-3 min-h-[100px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleForward}>Forward</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
