import { RenderComponent } from '@/types/RenderComponent';
import {
  LabeledContentSlots,
  LabeledContentStates,
} from './LabeledContent.types';
import { getSlots } from '@fluentui/react-components';

/**
 * Render the final JSX of LabeledContent.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of LabeledContent.
 */
export const renderLabeledContent: RenderComponent<
  LabeledContentStates
> = states => {
  const { slots, slotProps } = getSlots<LabeledContentSlots>(states);

  return (
    <>
      {slots.label && <slots.label {...slotProps.label} />}
      <slots.root {...slotProps.root} />
    </>
  );
};
