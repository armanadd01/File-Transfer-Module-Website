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
import { Transfer } from "@/types"

interface EditTransferDialogProps {
  isOpen: boolean
  onClose: () => void
  transfer: Transfer | null
  onSave: (updatedTransfer: Partial<Transfer>) => void
}

export function EditTransferDialog({
  isOpen,
  onClose,
  transfer,
  onSave,
}: EditTransferDialogProps) {
  const [title, setTitle] = useState(transfer?.title || "")
  const [fileName, setFileName] = useState(transfer?.fileName || "")
  const [recipientEmails, setRecipientEmails] = useState(
    transfer?.recipients.map((r) => r.email).join(", ") || ""
  )

  const handleSave = () => {
    if (!transfer) return

    // Parse recipient emails
    const emails = recipientEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "")

    const recipients = emails.map((email) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0], // Generate a name from email for demo purposes
      email,
    }))

    onSave({
      ...transfer,
      title,
      fileName,
      recipients,
    })

    onClose()
  }

  if (!transfer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex flex-col h-full overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
            <DialogTitle>Edit Transfer</DialogTitle>
            <DialogDescription>
              Make changes to your transfer details here.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 py-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileName" className="text-right">
                  File Name
                </Label>
                <Input
                  id="fileName"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="col-span-3"
                />
              </div>
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
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
