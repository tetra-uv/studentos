import { Container } from "../../components/ui/Container";
import { SectionHeader } from "../../components/public/SectionHeader";
import { Seo } from "../../components/seo/Seo";

export default function PrivacyPage() {
  return (
    <Container className="py-24 max-w-3xl">
      <Seo title="Privacy Policy" description="Read our privacy policy." />
      <SectionHeader 
        title="Privacy Policy"
        description="Last updated: June 2026"
      />
      <div className="mt-12 prose dark:prose-invert prose-slate mx-auto">
        <p className="text-muted-foreground leading-relaxed mb-6">
          At StudentOS, we take your privacy seriously. Currently, all your data is stored locally on your device using IndexedDB. We do not track your personal study habits or share any of your information with third parties.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If we introduce cloud syncing in the future, it will be strictly opt-in and your data will be encrypted securely.
        </p>
      </div>
    </Container>
  );
}
