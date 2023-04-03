import {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-components';

export type BlockquoteSlots = {
  root: Slot<'blockquote'>;
};

export type BlockquoteProps = ComponentProps<BlockquoteSlots>;

export type BlockquoteStates = ComponentState<BlockquoteSlots>;
