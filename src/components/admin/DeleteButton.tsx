"use client";

import { Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface DeleteButtonProps {
  action: (formData: FormData) => Promise<void>;
  id: string;
  idName: string;
  confirmMessage: string;
  title?: string;
  children?: ReactNode;
}

export default function DeleteButton({ 
  action, 
  id, 
  idName, 
  confirmMessage, 
  title = "Delete",
  children
}: DeleteButtonProps) {
  return (
    <form action={action}>
      <input type="hidden" name={idName} value={id} />
      <button 
        type="submit" 
        className="p-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
        title={title}
        onClick={(e) => {
          if (!confirm(confirmMessage)) {
            e.preventDefault();
          }
        }}
      >
        {children || <Trash2 className="w-5 h-5" />}
      </button>
    </form>
  );
}
