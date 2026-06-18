import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/Button";

interface DangerZoneProps {
  title: string;
  description: string;
  buttonText: string;
  onConfirm: () => void;
  requiredText?: string;
}

export function DangerZone({
  title,
  description,
  buttonText,
  onConfirm,
  requiredText = "RESET",
}: DangerZoneProps) {
  const [input, setInput] = useState("");

  const handleConfirm = () => {
    if (input === requiredText) {
      onConfirm();
      setInput("");
    }
  };

  const isEnabled = input === requiredText;

  return (
    <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3 text-red-800 dark:text-red-400">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs mt-1 opacity-90">{description}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type "${requiredText}" to confirm`}
          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm dark:border-red-900/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <Button
          variant="secondary"
          onClick={handleConfirm}
          disabled={!isEnabled}
          className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
