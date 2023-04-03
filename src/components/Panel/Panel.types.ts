import {
  Button,
  ComponentProps,
  ComponentState,
  Slot,
  Text,
} from '@fluentui/react-components';

export type PanelSlots = {
  root: NonNullable<Slot<'aside', 'div'>>;
  headerText?: Slot<typeof Text, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'>;
  backdrop?: Slot<'div'>;
  header?: Slot<'div'>;
  closeButton?: Slot<typeof Button>;
  itemContainer?: Slot<'div'>;
};

export type PanelProps = ComponentProps<PanelSlots> & {
  /** Hide panel after user clicked the backdrop. */
  isLightDismiss?: boolean;
  /** An event that will be triggered when user requests to hide the panel. */
  onDismiss?: () => void;
  /** Show the panel. */
  isOpened?: boolean;
  /** Set if panel should be shown on default. */
  defaultIsOpened?: boolean | (() => boolean);
  /** Specify panel position. */
  position?: 'left' | 'right';
};

export type PanelStates = ComponentState<PanelSlots> &
  Pick<PanelProps, 'children'> &
  Required<Pick<PanelProps, 'position'>> & {
    shouldRender: boolean;
    animationType: 'in' | 'out';
  };
