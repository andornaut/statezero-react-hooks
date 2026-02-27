// TypeScript definitions for statezero-react-hooks

import { Selector } from "statezero";

/**
 * Subscribe to state changes matching the selector.
 * Returns the current selected state value.
 *
 * @param selector - A statezero selector (string path, array of paths, or selector function)
 * @param isSync - If true, callback is called synchronously; otherwise debounced to next tick
 * @returns The current selected state value
 *
 * @example
 * const count = useStatezero('count');
 * const user = useStatezero(state => state.user);
 * const [a, b] = useStatezero(['path.a', 'path.b']);
 */
export function useStatezero<T = unknown>(selector?: Selector, isSync?: boolean): T;

/**
 * Subscribe to a specific path in state.
 * Returns a tuple of [value, setValue] similar to React's useState.
 *
 * @param path - A dot-notation string path to the state value
 * @param isSync - If true, callback is called synchronously; otherwise debounced to next tick
 * @returns A tuple of [currentValue, setValueFunction]
 *
 * @example
 * const [count, setCount] = useStatezeroPath('count');
 * const [name, setName] = useStatezeroPath('user.name');
 */
export function useStatezeroPath<T = unknown>(
  path: string,
  isSync?: boolean
): [T, (newValue: T) => void];

/**
 * Synchronous version of useStatezero.
 * Callbacks fire immediately on state change without debouncing.
 *
 * @param selector - A statezero selector (string path, array of paths, or selector function)
 * @returns The current selected state value
 */
export function useStatezeroSync<T = unknown>(selector?: Selector): T;

/**
 * Synchronous version of useStatezeroPath.
 * Callbacks fire immediately on state change without debouncing.
 *
 * @param path - A dot-notation string path to the state value
 * @returns A tuple of [currentValue, setValueFunction]
 */
export function useStatezeroPathSync<T = unknown>(path: string): [T, (newValue: T) => void];
