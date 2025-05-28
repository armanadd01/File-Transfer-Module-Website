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
import { Review } from "@/types"

interface CreateReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newReview: Partial<Review>) => void
}

export function CreateReviewDialog({
  isOpen,
  onClose,
  onSave,
}: CreateReviewDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [collaboratorEmails, setCollaboratorEmails] = useState("")

  const handleSave = () => {
    // Parse collaborator emails
    const emails = collaboratorEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "")

    const collaborators = emails.map((email) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0], // Generate a name from email for demo purposes
      email,
    }))

    const newReview: Partial<Review> = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      collaborators,
      files: [],
      status: "draft",
      createdAt: new Date().toISOString(),
      author: { // Add a mock author for the review
        id: 'current-user',
        name: 'Current User',
        email: 'user@example.com'
      },
      feedback: []
    }

    onSave(newReview)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCollaboratorEmails("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm()
        onClose()
      }
    }}
    >
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col  "> 
        <div className="flex flex-col h-full overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
            <DialogTitle>Create New Review</DialogTitle>
            <DialogDescription>
              Create a new review to get feedback on your work.
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
                  placeholder="Project review"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you need feedback on"
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="collaborators" className="text-right">
                  Collaborators
                </Label>
                <Input
                  id="collaborators"
                  value={collaboratorEmails}
                  onChange={(e) => setCollaboratorEmails(e.target.value)}
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
            <Button onClick={handleSave} disabled={!title.trim()}>
              Create Review
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
