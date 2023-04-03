import {
  SlotClassNames,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { SettingsGroupSlots, SettingsGroupStates } from './SettingsGroup.types';

export const settingsGroupClassNames: SlotClassNames<SettingsGroupSlots> = {
  header: 'SettingsGroup-Header',
  itemContainer: 'SettingsGroup-ItemContainer',
  root: 'SettingsGroup',
};

const useStyles = makeStyles<keyof SettingsGroupSlots>({
  header: {
    marginBottom: tokens.spacingVerticalS,
    display: 'block',
    ...typographyStyles.subtitle2,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    ...shorthands.margin(tokens.spacingVerticalM, 0),
  },
});

export function useSettingsGroupStyles(states: SettingsGroupStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    settingsGroupClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.header) {
    states.header.className = mergeClasses(
      settingsGroupClassNames.header,
      classNames.header,
      states.header.className
    );
  }

  if (states.itemContainer) {
    states.itemContainer.className = mergeClasses(
      settingsGroupClassNames.itemContainer,
      classNames.itemContainer,
      states.itemContainer.className
    );
  }

  return states;
}
