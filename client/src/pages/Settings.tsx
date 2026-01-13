import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LogOut, User, Bell, Moon, Trash2 } from "lucide-react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState({
    email: "user@example.com",
    username: "you",
    emailNotifications: true,
    pushNotifications: false,
    contestReminders: true,
    darkMode: true,
  });

  const handleLogout = () => {
    // Mock logout
    setLocation("/");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Mock delete
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-medium tracking-tight mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences.</p>
          </div>

          <div className="space-y-8">
            {/* Account Settings */}
            <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-medium">Account</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Username</label>
                  <Input
                    type="text"
                    value={settings.username}
                    onChange={(e) => setSettings({ ...settings, username: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-white/30"
                  />
                </div>
                <Button className="bg-white text-black hover:bg-white/90 h-10">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-medium">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium mb-1">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates via email
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium mb-1">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Browser push notifications
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium mb-1">Contest Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about new contests
                    </div>
                  </div>
                  <Switch
                    checked={settings.contestReminders}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, contestReminders: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-xl font-medium">Appearance</h2>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium mb-1">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Use dark theme (always enabled)
                  </div>
                </div>
                <Switch checked={true} disabled />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm border-rose-500/20">
              <h2 className="text-xl font-medium mb-6 text-rose-500/80">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium mb-1">Logout</div>
                    <div className="text-sm text-muted-foreground">
                      Sign out of your account
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-white/20 bg-transparent hover:bg-white/5"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div>
                    <div className="font-medium mb-1 text-rose-500/80">Delete Account</div>
                    <div className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleDeleteAccount}
                    className="border-rose-500/50 bg-transparent hover:bg-rose-500/10 text-rose-500/80"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
