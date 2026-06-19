import { useState, useRef } from "react";
import { Download, Upload, AlertTriangle } from "lucide-react";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { useAttendanceStore } from "../../store/attendanceStore";
import { exportAttendance, importAttendance } from "../../utils/importExport";

interface DataOptionsProps {
  onImportError: (msg: string) => void;
  onImportSuccess: () => void;
}

export function DataOptions({ onImportError, onImportSuccess }: DataOptionsProps) {
  const { subjects, importData, resetData } = useAttendanceStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isResetting, setIsResetting] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState("");

  const handleExport = () => {
    exportAttendance(subjects);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importAttendance(
      file,
      (validSubjects) => {
        importData(validSubjects);
        onImportSuccess();
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
      (errorMsg) => {
        onImportError(errorMsg);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    );
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetConfirmText === "RESET") {
      resetData();
      setIsResetting(false);
      setResetConfirmText("");
    }
  };

  return (
    <Card className="p-6 mt-12 bg-muted border-border">
      <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
        
        <div className="flex-1">
          <Text variant="h3" className="mb-1">Data Management</Text>
          <Text variant="muted" className="mb-4">Export your data to a JSON file or import from a previous backup. This happens entirely locally.</Text>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={handleExport} className="bg-card">
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
            
            <input 
              type="file" 
              accept=".json,application/json" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
              tabIndex={-1}
            />
            <Button variant="outline" onClick={handleImportClick} className="bg-card">
              <Upload className="h-4 w-4 mr-2" />
              Import JSON
            </Button>
          </div>
        </div>

        <div className="flex-1 md:max-w-xs pt-4 border-t border-border md:pt-0 md:border-t-0 md:border-l md:pl-6">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <Text variant="h3" className="text-red-600 dark:text-red-400">Danger Zone</Text>
          </div>
          <Text variant="muted" className="mb-4 text-xs">Permanently delete all attendance data. This action cannot be undone.</Text>
          
          {!isResetting ? (
            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
              onClick={() => setIsResetting(true)}
            >
              Reset Data
            </Button>
          ) : (
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-2">
              <Text className="text-xs font-medium text-muted-foreground">
                Type <span className="font-bold text-red-600 dark:text-red-400 select-all">RESET</span> to confirm:
              </Text>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={resetConfirmText}
                  onChange={(e) => setResetConfirmText(e.target.value)}
                  placeholder="RESET"
                  className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-red-400"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  disabled={resetConfirmText !== "RESET"}
                  className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                >
                  Confirm
                </Button>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="mt-1"
                onClick={() => {
                  setIsResetting(false);
                  setResetConfirmText("");
                }}
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
        
      </div>
    </Card>
  );
}
