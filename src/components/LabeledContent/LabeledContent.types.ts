import {
  ComponentProps,
  ComponentState,
  Label,
  Slot,
} from '@fluentui/react-components';

export type LabeledContentSlots = {
  root: NonNullable<Slot<'div'>>;
  label?: Slot<typeof Label>;
};

export type LabeledContentProps = ComponentProps<LabeledContentSlots>;

export type LabeledContentStates = ComponentState<LabeledContentSlots>;
