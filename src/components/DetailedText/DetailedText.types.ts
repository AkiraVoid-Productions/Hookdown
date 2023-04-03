import {
  ComponentProps,
  ComponentState,
  Slot,
  Text,
} from '@fluentui/react-components';

export type DetailedTextSlots = {
  root: NonNullable<Slot<typeof Text>>;
  details?: Slot<'div'>;
  detailsIcon?: Slot<'div'>;
};

export type DetailedTextProps = ComponentProps<DetailedTextSlots>;

export type DetailedTextStates = ComponentState<DetailedTextSlots> &
  Pick<DetailedTextProps, 'children'>;
