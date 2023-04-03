import { getNativeElementProps } from '@fluentui/react-components';
import { UseComponent } from '../../types/UseComponent';
import { BlockquoteProps, BlockquoteStates } from './Blockquote.types';

/**
 * Given user props, defines default props for the Blockquote, and returns
 * processed states.
 *
 * @param props User provided props to the Blockquote component.
 * @param ref User provided ref to be passed to the Blockquote component.
 * @returns Processed states.
 */
export const useBlockquote: UseComponent<BlockquoteProps, BlockquoteStates> = (
  props,
  ref
) => {
  return {
    components: {
      root: 'blockquote',
    },
    root: getNativeElementProps('blockquote', { ref, ...props }),
  };
};
