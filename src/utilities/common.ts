import MarkdownProcessorContext from '@/contexts/MarkdownProcessor';
import MarkdownProcessor from '@/helpers/MarkdownProcessor';
import React from 'react';

/**
 * Capitalize a string.
 *
 * @param str String to be capitalized.
 * @returns Capitalized string.
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Get all strings in all children of a React component, and join them together.
 *
 * @param {React.ReactNode} children Children of a React component。
 * @returns {string | undefined} All strings in all children。
 * @export
 */
export function getReactChildrenString(
  children: React.ReactNode
): string | undefined {
  return React.Children.map<string | undefined, unknown>(children, child => {
    if (
      typeof child === 'bigint' ||
      typeof child === 'number' ||
      typeof child === 'string' ||
      typeof child === 'boolean'
    ) {
      return child.toString();
    } else if (!child) {
      return '';
    } else {
      const childrenOfChild = (child as React.ReactPortal | React.ReactElement)
        .props.children;
      return getReactChildrenString(childrenOfChild);
    }
  }).join('');
}

/**
 * A React hook to generate a list of unique IDs.
 *
 * @param {number} count The count of generated IDs.
 * @returns {string[]} A list of unique IDs.
 * @export
 */
export function useIds(count: number) {
  const id = React.useId();

  const ids = React.useRef<string[]>([]);

  for (let i = 0; i < count; i++) {
    ids.current.push(`${id}-${i}`);
  }

  return ids.current;
}

/**
 * A React hook used to get the `MarkdownProcessor` instance stored in global
 * context.
 *
 * @returns {MarkdownProcessor} The `MarkdownProcessor` instance stored in
 *   global context.
 * @export
 */
export function useMarkdownProcessor() {
  const processor = React.useContext(MarkdownProcessorContext);

  return processor;
}

/**
 * A React hook seems to `useEffect`, but won't be triggered at first rendering.
 *
 * @param {React.EffectCallback} effect Imperative function that can return a
 *   cleanup function.
 * @param {React.DependencyList} [deps] If present, effect will only activate if
 *   the values in the list change.
 * @export
 */
export function useInitializedEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const isInitial = React.useRef(true);

  React.useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
    } else {
      effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps ?? []), effect]);
}
