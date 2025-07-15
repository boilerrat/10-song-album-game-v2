import * as React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children, className }) => {
  if (!open) return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 ${className || ''}`}
      onClick={() => onOpenChange(false)}>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-sm mx-2" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
Dialog.displayName = "Dialog"; 