import { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { useHabitStore } from "../../store/habitStore";
import type { Habit } from "../../types/habit";

interface HabitFormProps {
  initialData?: Habit;
  onClose: () => void;
}

const COLOR_OPTIONS: { label: string; value: string }[] = [
  { label: "Slate", value: "#64748b" },
  { label: "Red", value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Emerald", value: "#10b981" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Pink", value: "#ec4899" },
];

const INPUT_CLASS =
  "rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 w-full";

export function HabitForm({ initialData, onClose }: HabitFormProps) {
  const { addHabit, updateHabit } = useHabitStore();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [icon, setIcon] = useState(initialData?.icon || "");
  const [color, setColor] = useState(initialData?.color || "");
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const validate = (): boolean => {
    if (!name.trim()) {
      setError("Habit name cannot be empty.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData) {
      updateHabit(initialData.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        icon: icon.trim() || undefined,
        color: color || undefined,
      });
    } else {
      addHabit({
        name: name.trim(),
        description: description.trim() || undefined,
        icon: icon.trim() || undefined,
        color: color || undefined,
      });
    }
    onClose();
  };

  return (
    <Card className="p-5 border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20">
      <Text variant="h3" className="mb-4">{initialData ? "Edit Habit" : "Add Habit"}</Text>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/30 text-red-800 dark:text-red-400">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="hab-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Habit Name <span className="text-red-500">*</span>
          </label>
          <input
            ref={nameRef}
            id="hab-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (error) setError(null); }}
            placeholder="e.g. Read for 30 minutes"
            className={INPUT_CLASS}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="hab-desc" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Notes <span className="text-xs font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="hab-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why does this habit matter?"
            rows={2}
            className={INPUT_CLASS + " resize-none"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Icon */}
          <div className="flex flex-col gap-1">
            <label htmlFor="hab-icon" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Icon <span className="text-xs font-normal text-slate-400">(emoji, optional)</span>
            </label>
            <input
              id="hab-icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="📚"
              maxLength={4}
              className={INPUT_CLASS}
            />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Accent Color <span className="text-xs font-normal text-slate-400">(optional)</span>
            </span>
            <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Choose an accent color">
              {/* None option */}
              <button
                type="button"
                onClick={() => setColor("")}
                className={clsx(
                  "h-6 w-6 rounded-full border-2 bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400",
                  !color ? "border-slate-600 dark:border-slate-300" : "border-transparent"
                )}
                aria-label="No color"
                title="No color"
              />
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  className={clsx(
                    "h-6 w-6 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400",
                    color === opt.value ? "border-slate-700 dark:border-slate-200 scale-110" : "border-transparent"
                  )}
                  style={{ backgroundColor: opt.value }}
                  aria-label={opt.label}
                  title={opt.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Habit"}</Button>
        </div>
      </form>
    </Card>
  );
}
