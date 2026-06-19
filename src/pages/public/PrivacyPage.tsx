import { SectionHeader } from "../../components/public/SectionHeader";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <SectionHeader 
        title="Privacy Policy"
        description="How we handle your data."
      />
      <div className="mt-12 prose dark:prose-invert prose-slate mx-auto">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          At StudentOS, we take your privacy seriously. Currently, all your data is stored locally on your device using IndexedDB. We do not track your personal study habits or share any of your information with third parties.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          If we introduce cloud syncing in the future, it will be strictly opt-in and your data will be encrypted securely.
        </p>
      </div>
    </div>
  );
}
