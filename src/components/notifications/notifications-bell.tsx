"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/lib/notifications/notifications-context";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NotificationsPanel } from "./notifications-panel";
import { WeeklySummaryModal } from "./weekly-summary-modal";
import { getWeeklySummary } from "@/lib/actions/notification-actions";

export function NotificationsBell() {
  const { state } = useNotifications();
  const [showPanel, setShowPanel] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<{
    newProjects: number;
    wonProjects: string[];
    upcomingDeadlines: { name: string; deadline: Date; }[];
    newEmployees: string[];
  }>({
    newProjects: 0,
    wonProjects: [],
    upcomingDeadlines: [],
    newEmployees: []
  });

  const handleBellClick = async () => {
    setShowPanel(true);
    // Fetch and show summary
    const data = await getWeeklySummary();
    const formattedData = {
      ...data,
      upcomingDeadlines: data.upcomingDeadlines.map(d => ({
        name: d.name,
        deadline: new Date(d.deadline)
      }))
    };
    setSummary(formattedData);
    setShowSummary(true);
  };

  const handleClose = () => {
    setShowPanel(false);
    setShowSummary(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBellClick}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        <AnimatePresence>
          {state.unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {state.unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {showPanel && (
          <NotificationsPanel onClose={handleClose} />
        )}
      </AnimatePresence>

      <WeeklySummaryModal
        open={showSummary}
        onOpenChange={setShowSummary}
        summary={summary}
      />
    </div>
  );
} 