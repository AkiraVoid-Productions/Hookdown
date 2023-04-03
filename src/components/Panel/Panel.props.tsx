import { UseComponent } from '@/types/UseComponent';
import { PanelProps, PanelStates } from './Panel.types';
import {
  Button,
  Text,
  getNativeElementProps,
  resolveShorthand,
  useIsSSR,
} from '@fluentui/react-components';
import { useControllableState } from '@fluentui/react-utilities';
import React from 'react';
import { useInitializedEffect } from '@/utilities/common';
import { DismissRegular } from '@fluentui/react-icons';

/**
 * Given user props, defines default props for the Panel, and returns processed
 * states.
 *
 * @param props User provided props to the Panel component.
 * @param ref User provided ref to be passed to the Panel component.
 * @returns Processed states.
 */
export const usePanel: UseComponent<PanelProps, PanelStates> = (props, ref) => {
  const {
    backdrop,
    closeButton,
    header,
    headerText,
    itemContainer,
    isLightDismiss = false,
    isOpened,
    onDismiss,
    defaultIsOpened,
    children,
    position = 'right',
  } = props;

  const [opened, setOpened] = useControllableState<boolean>({
    state: isOpened,
    defaultState: defaultIsOpened,
    initialState: false,
  });
  const [animation, setAnimation] = React.useState<{
    type: 'in' | 'out';
    isPlaying: boolean;
  }>({
    type: opened ? 'in' : 'out',
    isPlaying: false,
  });

  const [shouldRender, setShouldRender] = React.useState(false);

  const isSsr = useIsSSR();

  React.useEffect(() => {
    if (!isSsr) {
      setAnimation({ type: opened ? 'in' : 'out', isPlaying: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSsr, opened]);
  React.useEffect(() => {
    if (animation.type === 'in') {
      setShouldRender(true);
    } else {
      if (!animation.isPlaying) {
        setShouldRender(false);
      }
    }
  }, [animation]);

  const resolvedBackdrop = resolveShorthand(backdrop, {
    required: true,
    defaultProps: {
      onClick: isLightDismiss
        ? () => {
            setOpened(false);
            onDismiss && onDismiss();
          }
        : undefined,
    },
  });

  const resolvedCloseButton = resolveShorthand(closeButton, {
    required: true,
    defaultProps: {
      icon: <DismissRegular />,
      appearance: 'subtle',
      onClick: () => {
        setOpened(false);
        onDismiss && onDismiss();
      },
    },
  });

  const resolvedHeader = resolveShorthand(header, {
    required: true,
    defaultProps: {},
  });

  const resolvedHeaderText = resolveShorthand(headerText, {
    required: true,
    defaultProps: {},
  });

  const resolvedItemContainer = resolveShorthand(itemContainer, {
    required: true,
    defaultProps: {},
  });

  return {
    components: {
      root: 'aside',
      backdrop: 'div',
      closeButton: Button,
      header: 'div',
      headerText: Text,
      itemContainer: 'div',
    },
    root: {
      ...getNativeElementProps(props.as ?? 'aside', {
        ...props,
        ref,
      }),
      onAnimationStart: e => {
        setAnimation({ ...animation, isPlaying: true });
        props.onAnimationStart &&
          props.onAnimationStart(e as React.AnimationEvent<HTMLDivElement>);
      },
      onAnimationEnd: e => {
        setAnimation({ ...animation, isPlaying: false });
        props.onAnimationEnd &&
          props.onAnimationEnd(e as React.AnimationEvent<HTMLDivElement>);
      },
    },
    backdrop: resolvedBackdrop,
    closeButton: resolvedCloseButton,
    header: resolvedHeader,
    headerText: resolvedHeaderText,
    itemContainer: resolvedItemContainer,
    children: children,
    shouldRender,
    position,
    animationType: animation.type,
  };
};
