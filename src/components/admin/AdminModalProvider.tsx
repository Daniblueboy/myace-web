"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type AlertOptions = {
  title: string;
  description?: string;
  confirmText?: string;
};

type AdminModalContextValue = {
  confirmAction: (options: ConfirmOptions) => Promise<boolean>;
  showAlert: (options: AlertOptions) => Promise<void>;
};

const AdminModalContext = createContext<AdminModalContextValue | null>(null);

export function useAdminModal() {
  const ctx = useContext(AdminModalContext);
  if (!ctx) {
    throw new Error("useAdminModal must be used within AdminModalProvider");
  }
  return ctx;
}

export function AdminModalProvider({ children }: { children: React.ReactNode }) {
  const confirmResolver = useRef<((value: boolean) => void) | null>(null);
  const alertResolver = useRef<(() => void) | null>(null);

  const [confirmState, setConfirmState] = useState<ConfirmOptions & { open: boolean }>({
    title: "",
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    open: false,
  });
  const [alertState, setAlertState] = useState<AlertOptions & { open: boolean }>({
    title: "",
    description: "",
    confirmText: "OK",
    open: false,
  });

  const confirmAction = (options: ConfirmOptions) => {
    setConfirmState({
      open: true,
      title: options.title,
      description: options.description,
      confirmText: options.confirmText || "Confirm",
      cancelText: options.cancelText || "Cancel",
    });
    return new Promise<boolean>((resolve) => {
      confirmResolver.current = resolve;
    });
  };

  const showAlert = (options: AlertOptions) => {
    setAlertState({
      open: true,
      title: options.title,
      description: options.description,
      confirmText: options.confirmText || "OK",
    });
    return new Promise<void>((resolve) => {
      alertResolver.current = resolve;
    });
  };

  const contextValue = useMemo(
    () => ({ confirmAction, showAlert }),
    []
  );

  return (
    <AdminModalContext.Provider value={contextValue}>
      {children}

      <Dialog open={confirmState.open} onOpenChange={(open) => !open && setConfirmState((prev) => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmState.title}</DialogTitle>
            <DialogDescription className={confirmState.description ? '' : 'sr-only'}>
              {confirmState.description || 'Confirm this action.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmState((prev) => ({ ...prev, open: false }));
                confirmResolver.current?.(false);
              }}
            >
              {confirmState.cancelText || "Cancel"}
            </Button>
            <Button
              onClick={() => {
                setConfirmState((prev) => ({ ...prev, open: false }));
                confirmResolver.current?.(true);
              }}
            >
              {confirmState.confirmText || "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={alertState.open} onOpenChange={(open) => !open && setAlertState((prev) => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{alertState.title}</DialogTitle>
            <DialogDescription className={alertState.description ? '' : 'sr-only'}>
              {alertState.description || 'Notification'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setAlertState((prev) => ({ ...prev, open: false }));
                alertResolver.current?.();
              }}
            >
              {alertState.confirmText || "OK"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminModalContext.Provider>
  );
}
