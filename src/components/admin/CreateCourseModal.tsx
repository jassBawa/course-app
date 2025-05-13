'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { createCourse } from '@/lib/actions/adminActions';

export default function CreateCourseModalContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error('Course title is required');
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await createCourse({ title, description });
      if (error) {
        toast.error(error);
      } else {
        toast.success('Course created successfully');
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to create course');
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <DialogHeader>
      <DialogTitle>Create New Course</DialogTitle>
      <DialogDescription>Provide details for your new course</DialogDescription>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Course Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional course description"
            rows={4}
          />
        </div>
        <Button
          onClick={handleCreate}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Creating...' : 'Create Course'}
        </Button>
      </div>
    </DialogHeader>
  );
}
