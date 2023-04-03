import {
  makeStyles,
  mergeClasses,
  shorthands,
  SlotClassNames,
  tokens,
} from '@fluentui/react-components';
import { BlockquoteSlots, BlockquoteStates } from './Blockquote.types';

export const blockquoteClassNames: SlotClassNames<BlockquoteSlots> = {
  root: 'blockquote',
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    ...shorthands.padding(
      tokens.spacingVerticalM,
      tokens.spacingHorizontalM,
      tokens.spacingVerticalM,
      tokens.spacingHorizontalXL
    ),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    ...shorthands.margin(tokens.spacingHorizontalS, 0),
    ...shorthands.borderLeft(
      tokens.strokeWidthThickest,
      'solid',
      tokens.colorNeutralForeground3
    ),
    '>p': {
      ...shorthands.margin(0),
    },
  },
});

export const useBlockquoteStyles = (states: BlockquoteStates) => {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    blockquoteClassNames.root,
    classNames.root,
    states.root.className
  );

  return states;
};
