import {
  SlotClassNames,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import { PanelSlots, PanelStates } from './Panel.types';

export const panelClassNames: SlotClassNames<PanelSlots> = {
  backdrop: 'Panel-Backdrop',
  closeButton: 'Panel-CloseButton',
  header: 'Panel-Header',
  headerText: 'Panel-HeaderText',
  itemContainer: 'Panel-ItemContainer',
  root: 'Panel',
};

const useStyles = makeStyles<
  | keyof PanelSlots
  | 'rootLeft'
  | 'rootRight'
  | 'rootLeftIn'
  | 'rootLeftOut'
  | 'rootRightIn'
  | 'rootRightOut'
  | 'backdropIn'
  | 'backdropOut'
>({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    animationDuration: tokens.durationNormal,
    animationFillMode: 'forwards',
    ...shorthands.overflow('hidden'),
  },
  closeButton: {},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: tokens.spacingVerticalL,
  },
  headerText: {
    ...typographyStyles.title3,
  },
  itemContainer: {
    height: '100%',
    ...shorthands.overflow('hidden', 'auto'),
  },
  root: {
    position: 'fixed',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    width: '400px',
    height: '100%',
    boxShadow: tokens.shadow16,
    animationDuration: tokens.durationNormal,
    animationFillMode: 'forwards',
    boxSizing: 'border-box',
    ...shorthands.overflow('hidden'),
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
  rootLeft: {
    left: 0,
  },
  rootRight: {
    right: 0,
  },
  rootLeftIn: {
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: {
        transform: 'translateX(-100%)',
      },
      to: {
        transform: 'translateX(0)',
      },
    },
  },
  rootLeftOut: {
    animationTimingFunction: tokens.curveAccelerateMid,
    animationName: {
      from: {
        transform: 'translateX(0)',
      },
      to: {
        transform: 'translateX(-100%)',
      },
    },
  },
  rootRightIn: {
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: {
        transform: 'translateX(100%)',
      },
      to: {
        transform: 'translateX(0)',
      },
    },
  },
  rootRightOut: {
    animationTimingFunction: tokens.curveAccelerateMid,
    animationName: {
      from: {
        transform: 'translateX(0)',
      },
      to: {
        transform: 'translateX(100%)',
      },
    },
  },
  backdropIn: {
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: {
        backgroundColor: 'rgba(0,0,0,0)',
      },
      to: {
        backgroundColor: tokens.colorBackgroundOverlay,
      },
    },
  },
  backdropOut: {
    animationTimingFunction: tokens.curveAccelerateMid,
    animationName: {
      from: {
        backgroundColor: tokens.colorBackgroundOverlay,
      },
      to: {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
  },
});

export function usePanelStyles(states: PanelStates) {
  const classNames = useStyles();

  states.root.className = mergeClasses(
    panelClassNames.root,
    classNames.root,
    states.position === 'left' ? classNames.rootLeft : classNames.rootRight,
    states.position === 'left'
      ? states.animationType === 'in'
        ? classNames.rootLeftIn
        : classNames.rootLeftOut
      : states.animationType === 'in'
      ? classNames.rootRightIn
      : classNames.rootRightOut,
    states.root.className
  );

  if (states.backdrop) {
    states.backdrop.className = mergeClasses(
      panelClassNames.backdrop,
      classNames.backdrop,
      states.animationType === 'in'
        ? classNames.backdropIn
        : classNames.backdropOut,
      states.backdrop.className
    );
  }

  if (states.closeButton) {
    states.closeButton.className = mergeClasses(
      panelClassNames.closeButton,
      classNames.closeButton,
      states.closeButton.className
    );
  }

  if (states.header) {
    states.header.className = mergeClasses(
      panelClassNames.header,
      classNames.header,
      states.header.className
    );
  }

  if (states.headerText) {
    states.headerText.className = mergeClasses(
      panelClassNames.headerText,
      classNames.headerText,
      states.headerText.className
    );
  }

  if (states.itemContainer) {
    states.itemContainer.className = mergeClasses(
      panelClassNames.itemContainer,
      classNames.itemContainer,
      states.itemContainer.className
    );
  }

  return states;
}
