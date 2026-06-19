import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { UserAvatar } from "../../components/user/UserAvatar";
import { Toast } from "../../components/ui/Toast";

const AVATAR_COLORS = [
  "violet",
  "emerald",
  "rose",
  "amber",
  "blue",
  "cyan",
  "indigo",
];

export default function ProfilePage() {
  const { profile, updateProfile } = useUserStore();
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [avatarColor, setAvatarColor] = useState("violet");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setSubtitle(profile.subtitle);
      setAvatarColor(profile.avatarColor);
    }
  }, [profile]);

  if (!profile) return null;

  const handleSave = () => {
    updateProfile({ name, subtitle, avatarColor });
    setShowToast(true);
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-20 space-y-8">
      <PageHeader 
        title="Account & Identity" 
        description="Manage your local identity, workspace settings, and appearance." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Preview & Identity */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="bg-muted/50 p-4 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Live Preview
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <UserAvatar 
                user={{ ...profile, name, avatarColor }} 
                size="xl" 
                className="mb-4"
              />
              <h3 className="text-lg font-bold text-foreground">
                {name || "Guest"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {subtitle || "No subtitle"}
              </p>
              {profile.isGuest && (
                <div className="mt-6 inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                  Local Workspace
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Settings Sections */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">General Information</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Display Name</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Mohd. Uvais"
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Subtitle / Status</label>
                <Input 
                  value={subtitle} 
                  onChange={(e) => setSubtitle(e.target.value)} 
                  placeholder="e.g. Built by students"
                  className="max-w-md"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Identity & Appearance</h3>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Avatar Theme Color</label>
              <div className="flex flex-wrap gap-3">
                {AVATAR_COLORS.map((color) => {
                  const colorMap: Record<string, string> = {
                    violet: "bg-violet-500/20 text-violet-500",
                    emerald: "bg-emerald-500/20 text-emerald-500",
                    rose: "bg-rose-500/20 text-rose-500",
                    amber: "bg-amber-500/20 text-amber-500",
                    blue: "bg-blue-500/20 text-blue-500",
                    cyan: "bg-cyan-500/20 text-cyan-500",
                    indigo: "bg-indigo-500/20 text-indigo-500",
                  };
                  return (
                    <button
                      key={color}
                      onClick={() => setAvatarColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        avatarColor === color 
                          ? "border-foreground scale-110 shadow-md" 
                          : "border-transparent hover:scale-105"
                      } ${colorMap[color]}`}
                      aria-label={`Select ${color} color`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This color will be used across your workspace for your avatar and identity markers.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Connected Accounts (Coming Soon)</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Currently using a local workspace. Cloud sync and integrations will be available in future updates.
            </p>
            <div className="space-y-3">
              {['Google', 'GitHub', 'Email'].map((provider) => (
                <div key={provider} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-foreground/10" />
                    <span className="font-medium text-foreground">Connect with {provider}</span>
                  </div>
                  <Button variant="outline" disabled size="sm">Connect</Button>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast 
          message="Profile updated successfully!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}
