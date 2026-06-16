'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const styles: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-400 text-green-800',
  error:   'bg-red-50 border-red-400 text-red-800',
  info:    'bg-blue-50 border-blue-400 text-blue-800',
};

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={cn('fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border px-4 py-3 shadow-md', styles[type])}>
      <div className="flex items-start gap-2">
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-auto text-current opacity-60 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}

// Hook simple pour gérer les toasts
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const show = (message: string, type: ToastType = 'info') => setToast({ message, type });
  const hide = () => setToast(null);

  return { toast, show, hide };
}
