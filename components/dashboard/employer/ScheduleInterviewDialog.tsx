"use client";

import { useState } from "react";
import { CalendarDays, Clock, Video, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Application } from "@/types/applications";
import { scheduleInterview } from "@/services/interviews";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";

interface ScheduleInterviewDialogProps {
  application: Application;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScheduleInterviewDialog({
  application,
  open,
  onOpenChange,
}: ScheduleInterviewDialogProps) {
  const user = useAppSelector(selectedUser);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("30");
  const [type, setType] = useState<"video" | "phone" | "in_person">("video");

  const [meetingUrl, setMeetingUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) {
      toast.error("Please select interview date and time");
      return;
    }

    if (!user?.id) {
      toast.error("Employer is not authenticated");
      return;
    }

    if (type === "video" && !meetingUrl.trim()) {
      toast.error("Please provide the meeting URL");
      return;
    }

    try {
      setLoading(true);

      const scheduledAt = new Date(`${date}T${time}`).toISOString();

      await scheduleInterview({
        applicationId: application.id,
        employerId: user.id,
        scheduledAt,
        durationMinutes: Number(duration),
        interviewType: type,
        meetingUrl: type === "video" ? meetingUrl : undefined,
        notes,
      });

      toast.success("Interview scheduled successfully");

      onOpenChange(false);
      setDate("");
      setTime("");
      setDuration("30");
      setType("video");
      setMeetingUrl("");
      setNotes("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to schedule interview",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Schedule Interview
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Schedule an interview with{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {application.profiles?.full_name || "Candidate"}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {application.job?.title || "Position"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Interview Date
              </label>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm font-medium text-slate-800 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-700 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Interview Time
              </label>

              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm font-medium text-slate-800 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-700 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Duration
            </label>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-sm font-medium text-slate-800 transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-700 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interview Type
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType("video")}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all duration-150 active:scale-[0.98] ${
                  type === "video"
                    ? "border-blue-500/30 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10 dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-400"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                <Video className="h-4 w-4 shrink-0" />
                Video
              </button>

              <button
                type="button"
                onClick={() => setType("phone")}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all duration-150 active:scale-[0.98] ${
                  type === "phone"
                    ? "border-blue-500/30 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10 dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-400"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                <Phone className="h-4 w-4 shrink-0" />
                Phone
              </button>

              <button
                type="button"
                onClick={() => setType("in_person")}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all duration-150 active:scale-[0.98] ${
                  type === "in_person"
                    ? "border-blue-500/30 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10 dark:border-blue-500/40 dark:bg-blue-950/40 dark:text-blue-400"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                <MapPin className="h-4 w-4 shrink-0" />
                In Person
              </button>
            </div>
          </div>

          {type === "video" && (
            <div className="space-y-1.5 animate-in fade-in-50 slide-in-from-top-1 duration-200">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Meeting URL
              </label>

              <input
                type="url"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-sm font-medium text-slate-800 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-700 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add interview notes, preparation details, or instructions..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-800 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-700 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {loading ? "Scheduling..." : "Schedule Interview"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
