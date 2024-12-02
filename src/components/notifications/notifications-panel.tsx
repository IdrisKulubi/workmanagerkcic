"use client";

import { motion } from "framer-motion";
import { useNotifications } from "@/lib/notifications/notifications-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Trophy, Calendar, UserPlus, FileText, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { state, markAllAsRead, markAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'PROJECT_WON':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'PROJECT_DEADLINE':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'NEW_EMPLOYEE':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 mt-2 w-96 bg-card rounded-lg shadow-lg border z-50"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-sm"
          >
            <Check className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[32rem]">
        <div className="p-2">
          {state.notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <div className="space-y-1">
              {state.notifications.map((notification) => (
                <motion.div
                  key={`notification-${notification.id}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg transition-colors cursor-pointer
                    ${notification.read ? 'bg-muted/50' : 'bg-muted hover:bg-muted/80'}
                    ${notification.priority === 'high' ? 'border-l-4 border-red-500' : ''}
                  `}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
} 