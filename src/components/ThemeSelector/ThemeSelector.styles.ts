import {
  makeStyles,
  mergeClasses,
  SlotClassNames,
} from '@fluentui/react-components';
import { ThemeSelectorSlots, ThemeSelectorStates } from './ThemeSelector.types';

export const themeSelectorClassNames: SlotClassNames<ThemeSelectorSlots> = {
  root: 'themeSelector',
  menuTrigger: 'themeSelector-menuTrigger',
  menuPopover: 'themeSelector-menuPopover',
};

const useStyles = makeStyles({
  root: {},
  menuTrigger: {},
  menuPopover: {},
});

export const useThemeSelectorStyles = (states: ThemeSelectorStates) => {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    themeSelectorClassNames.root,
    classNames.root,
    states.root.className
  );

  if (states.menuTrigger) {
    states.menuTrigger.className = mergeClasses(
      themeSelectorClassNames.menuTrigger,
      classNames.menuTrigger,
      states.menuTrigger.className
    );
  }

  if (states.menuPopover) {
    states.menuPopover.className = mergeClasses(
      themeSelectorClassNames.menuPopover,
      classNames.menuPopover,
      states.menuPopover.className
    );
  }

  return states;
};
