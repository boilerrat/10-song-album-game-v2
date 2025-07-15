import * as React from "react";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onOpenChange, children, className }) => {
  if (!open) return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-end bg-black/40 ${className || ''}`}
      onClick={() => onOpenChange(false)}>
      <div className="bg-white dark:bg-zinc-900 rounded-t-lg shadow-lg p-6 w-full max-w-md mx-auto" style={{ minHeight: 200 }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
Drawer.displayName = "Drawer"; 