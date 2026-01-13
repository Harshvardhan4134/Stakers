import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Bell, Trophy, TrendingUp, Info, X } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "rank",
    title: "Rank Changed",
    message: "Your rank improved from #45 to #42 in Daily Challenge",
    time: "2 hours ago",
    read: false,
    icon: TrendingUp,
  },
  {
    id: 2,
    type: "contest",
    title: "New Contest Starting",
    message: "Weekly Crypto contest starts in 3 hours",
    time: "5 hours ago",
    read: false,
    icon: Trophy,
  },
  {
    id: 3,
    type: "badge",
    title: "Badge Earned",
    message: "You earned the 'Top 10%' badge!",
    time: "1 day ago",
    read: true,
    icon: Trophy,
  },
  {
    id: 4,
    type: "info",
    title: "Contest Ending Soon",
    message: "Daily Challenge ends in 2 hours. Check your final rank!",
    time: "1 day ago",
    read: true,
    icon: Info,
  },
  {
    id: 5,
    type: "rank",
    title: "Rank Update",
    message: "You're now ranked #15 in Weekly Crypto",
    time: "2 days ago",
    read: true,
    icon: TrendingUp,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-8 h-8 text-indigo-400" />
                <h1 className="text-4xl font-medium tracking-tight">Notifications</h1>
              </div>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                onClick={markAllAsRead}
                className="text-muted-foreground hover:text-white"
              >
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="border border-white/5 bg-white/[0.02] p-12 backdrop-blur-sm text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification, i) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                    className={`border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors ${
                      !notification.read ? "border-l-2 border-l-indigo-500" : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`p-3 border border-white/5 bg-white/[0.01] ${
                        !notification.read ? "border-indigo-500/50" : ""
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          notification.type === "rank" ? "text-indigo-400" :
                          notification.type === "badge" ? "text-emerald-500/80" :
                          notification.type === "contest" ? "text-yellow-500/80" :
                          "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-muted-foreground hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs"
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
