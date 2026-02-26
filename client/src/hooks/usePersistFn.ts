import { useRef } from "react";

/**
 * usePersistFn instead of useCallback to reduce cognitive load
 */
export function usePersistFn<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T | null>(null);
  if (!persistFn.current) {
    persistFn.current = (function (this: unknown, ...args: unknown[]) {
      return fnRef.current!.apply(this, args);
    } as unknown) as T;
  }

  return persistFn.current!;
}
