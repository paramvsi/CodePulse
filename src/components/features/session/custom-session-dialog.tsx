"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector } from "./language-selector";
import { ActivityTypeSelector } from "./activity-type-selector";
import { useSessionStore } from "@/lib/stores/session-store";
import type { ProgrammingLanguage, ActivityType } from "@/types/session";

const sessionSchema = z.object({
  projectName: z.string().min(1, "Project name is required").max(100, "Project name too long"),
  language: z.string().min(1, "Please select a language"),
  activityType: z.string().min(1, "Please select an activity type"),
  notes: z.string().max(500, "Notes too long (max 500 characters)").optional(),
});

type SessionFormData = z.infer<typeof sessionSchema>;

interface CustomSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomSessionDialog({ open, onOpenChange }: CustomSessionDialogProps) {
  const { startSession } = useSessionStore();
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>("typescript");
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>("coding");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      projectName: "",
      language: "typescript",
      activityType: "coding",
      notes: "",
    },
  });

  const onSubmit = (data: SessionFormData) => {
    startSession(
      data.projectName,
      selectedLanguage,
      selectedActivity,
      data.notes
    );

    toast.success("Session started!", {
      description: `Tracking ${data.projectName} - ${selectedLanguage}`,
    });

    reset();
    onOpenChange(false);
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-electric-indigo/20 bg-graphite sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Start Custom Session
          </DialogTitle>
          <DialogDescription className="text-cloud-gray">
            Configure your coding session details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-white">
              Project Name *
            </Label>
            <Input
              id="projectName"
              placeholder="e.g., CodePulse Dashboard"
              className="border-electric-indigo/20 bg-deep-space text-white placeholder:text-cloud-gray/50 focus:border-soft-cyan focus:ring-soft-cyan"
              {...register("projectName")}
            />
            {errors.projectName && (
              <p className="text-sm text-coral-red">{errors.projectName.message}</p>
            )}
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <Label className="text-white">Programming Language *</Label>
            <LanguageSelector
              value={selectedLanguage}
              onChange={(lang) => {
                setSelectedLanguage(lang);
              }}
            />
          </div>

          {/* Activity Type */}
          <div className="space-y-2">
            <Label className="text-white">Activity Type *</Label>
            <ActivityTypeSelector
              value={selectedActivity}
              onChange={(activity) => {
                setSelectedActivity(activity);
              }}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">
              Session Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="What are you working on?"
              rows={3}
              className="resize-none border-electric-indigo/20 bg-deep-space text-white placeholder:text-cloud-gray/50 focus:border-soft-cyan focus:ring-soft-cyan"
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-sm text-coral-red">{errors.notes.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-cloud-gray/30 text-cloud-gray hover:bg-cloud-gray/10 hover:text-cloud-gray"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-electric-indigo text-white hover:bg-electric-indigo/90 hover:shadow-lg hover:shadow-electric-indigo/30"
            >
              Start Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
