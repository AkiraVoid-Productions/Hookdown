import { getSlots } from '@fluentui/react-components';
import { RenderComponent } from '../../types/RenderComponent';
import { BlockquoteSlots, BlockquoteStates } from './Blockquote.types';

/**
 * Render the final JSX of Blockquote.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of Blockquote.
 */
export const renderBlockquote: RenderComponent<BlockquoteStates> = states => {
  const { slots, slotProps } = getSlots<BlockquoteSlots>(states);

  return <slots.root {...slotProps.root} />;
};
