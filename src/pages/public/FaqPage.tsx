import { SectionHeader } from "../../components/public/SectionHeader";

export default function FaqPage() {
  const faqs = [
    { question: "Is StudentOS free?", answer: "Yes, the core features of StudentOS are completely free for students." },
    { question: "Does it work offline?", answer: "Yes, StudentOS is built as a PWA with full offline support. Your data syncs when you reconnect." },
    { question: "Can I use it on my phone?", answer: "Absolutely. StudentOS is fully responsive and can be installed on your iOS or Android device." }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <SectionHeader 
        title="Frequently Asked Questions"
        description="Got questions? We've got answers."
      />
      <div className="mt-12 space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-50">{faq.question}</h3>
            <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
