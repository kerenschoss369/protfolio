"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  CommandMenu,
  useCommandMenuShortcut,
} from "@/components/command-menu/CommandMenu";

type CommandMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openCommandMenu: () => void;
};

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);

export function useCommandMenu(): CommandMenuContextValue {
  const value = useContext(CommandMenuContext);
  if (!value) {
    return {
      open: false,
      setOpen: () => undefined,
      openCommandMenu: () => undefined,
    };
  }
  return value;
}

export function CommandMenuHost({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openCommandMenu = useCallback(() => {
    setOpen(true);
  }, []);

  useCommandMenuShortcut(
    useCallback(() => {
      setOpen(true);
    }, []),
  );

  const value = useMemo(
    () => ({ open, setOpen, openCommandMenu }),
    [open, openCommandMenu],
  );

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandMenu open={open} onOpenChange={setOpen} />
    </CommandMenuContext.Provider>
  );
}
