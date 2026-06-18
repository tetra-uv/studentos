import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

/**
 * TimerControls — Start / Pause / Resume / Reset.
 * Keyboard accessible: all buttons are standard <button> elements.
 */
export function TimerControls({ isRunning, onStart, onPause, onReset }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        aria-label="Reset timer"
        className="h-10 w-10 rounded-full p-0"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>

      <Button
        onClick={isRunning ? onPause : onStart}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
        className="h-14 w-14 rounded-full p-0 text-base"
      >
        {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
      </Button>

      {/* Spacer to keep start button centred */}
      <div className="h-10 w-10" aria-hidden="true" />
    </div>
  );
}
