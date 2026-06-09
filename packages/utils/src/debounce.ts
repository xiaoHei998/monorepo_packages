export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface DebouncedFunction<T extends (...args: never[]) => unknown> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

/**
 * Debounce a function call.
 *
 * @param fn - Function to debounce
 * @param wait - Delay in milliseconds
 * @param options - Leading/trailing edge behavior
 * @returns Debounced function with cancel/flush helpers
 *
 * @example
 * ```ts
 * const save = debounce(() => api.save(), 300);
 * save();
 * save.cancel();
 * ```
 */
export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  wait: number,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  if (wait < 0) {
    throw new RangeError('wait must be a non-negative number');
  }

  const { leading = false, trailing = true } = options;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const invoke = (): void => {
    if (lastArgs === undefined) {
      return;
    }

    fn(...lastArgs);
    lastArgs = undefined;
  };

  const debounced = ((...args: Parameters<T>): void => {
    lastArgs = args;

    const callNow = leading && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    if (trailing) {
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        if (!callNow) {
          invoke();
        }
      }, wait);
    }

    if (callNow) {
      invoke();
    }
  }) as DebouncedFunction<T>;

  debounced.cancel = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    lastArgs = undefined;
  };

  debounced.flush = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    invoke();
  };

  return debounced;
}
