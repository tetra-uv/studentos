import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../../store/userStore";
import { APP_ROUTES } from "../../config/routes";
import { Logo } from "../../components/ui/Logo";
import { Mail, Key, User, Cloud, Smartphone, Sparkles, Calendar } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

const FEATURES = [
  {
    icon: <Smartphone className="w-5 h-5 text-violet-500" />,
    title: "Sync across devices",
    description: "Access your academic data anywhere, anytime.",
  },
  {
    icon: <Cloud className="w-5 h-5 text-blue-500" />,
    title: "Secure cloud backup",
    description: "Never lose your attendance or assignment data.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    title: "AI Assistant",
    description: "Get smart insights and personalized schedules.",
  },
  {
    icon: <Calendar className="w-5 h-5 text-emerald-500" />,
    title: "Calendar integration",
    description: "Sync with Google Calendar and Outlook.",
  },
];

export default function AuthPage() {
  const navigate = useNavigate();
  const { updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [guestName, setGuestName] = useState("");

  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      updateProfile({ 
        name: guestName, 
        isGuest: true,
        subtitle: "Local Guest Account"
      });
      setIsLoading(false);
      navigate(APP_ROUTES.DASHBOARD);
    }, 600);
  };

  const handleProviderClick = () => {
    alert("Cloud sync and social login are coming in a future update! For now, please continue as a guest.");
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Column - Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 lg:p-24 border-r border-border bg-muted/20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          <Logo className="mb-12" />
          
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Supercharge your academic workflow.
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Create an account to unlock premium features and keep your workspace perfectly in sync.
          </p>

          <div className="space-y-8">
            {FEATURES.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-background border border-border shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column - Auth */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Logo />
          </div>

          <div className="bg-card border border-border-strong dark:border-border shadow-2xl shadow-black/5 dark:shadow-black/20 rounded-2xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">Welcome to StudentOS</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your premium workspace
              </p>
            </div>

            {/* Guest Form (Primary Action) */}
            <form onSubmit={handleGuestLogin} className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Local Workspace Name</label>
                <Input
                  autoFocus
                  placeholder="What should we call you?"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="h-11 bg-muted/50 border-border"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold active:scale-[0.98]"
                disabled={!guestName.trim() || isLoading}
              >
                {isLoading ? "Preparing Workspace..." : "Continue as Guest"}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-card px-3 text-muted-foreground font-semibold">Or connect with</span>
              </div>
            </div>

            {/* Providers (Secondary Actions) */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-center gap-3 h-11 active:scale-[0.98] bg-background hover:bg-muted/50 text-muted-foreground"
                onClick={handleProviderClick}
                type="button"
              >
                <User className="w-4 h-4" />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center gap-3 h-11 active:scale-[0.98] bg-background hover:bg-muted/50 text-muted-foreground"
                onClick={handleProviderClick}
                type="button"
              >
                <Key className="w-4 h-4" />
                Continue with Apple
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center gap-3 h-11 active:scale-[0.98] bg-background hover:bg-muted/50 text-muted-foreground"
                onClick={handleProviderClick}
                type="button"
              >
                <Mail className="w-4 h-4" />
                Continue with Email
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-8 opacity-70">
              Guest accounts are stored locally on your device.
              <br />
              No data is sent to our servers.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
