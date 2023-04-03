import {
  SlotClassNames,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { DetailedTextSlots, DetailedTextStates } from './DetailedText.types';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';

export const detailedTextClassNames: SlotClassNames<DetailedTextSlots> = {
  root: 'DetailedText',
  details: 'DetailedText-Details',
  detailsIcon: 'DetailedText-DetailsIcon',
};

const useStyles = makeStyles<keyof DetailedTextSlots>({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    '& > div': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  details: {},
  detailsIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: tokens.spacingHorizontalXXS,
    color: tokens.colorBrandForeground1,
    cursor: 'help',
    '& svg': {
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'block',
    },
    ':hover': {
      [`& .${iconFilledClassName}`]: {
        display: 'block',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },
});

export function useDetailedTextStyles(states: DetailedTextStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    detailedTextClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.details) {
    states.details.className = mergeClasses(
      detailedTextClassNames.details,
      classNames.details,
      states.details.className
    );
  }

  if (states.detailsIcon) {
    states.detailsIcon.className = mergeClasses(
      detailedTextClassNames.detailsIcon,
      classNames.detailsIcon,
      states.detailsIcon.className
    );
  }

  return states;
}
