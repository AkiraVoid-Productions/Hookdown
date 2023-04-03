import { UseComponent } from '@/types/UseComponent';
import { DetailedTextProps, DetailedTextStates } from './DetailedText.types';
import { Text, resolveShorthand } from '@fluentui/react-components';
import React from 'react';
import { InfoRegular, InfoFilled, bundleIcon } from '@fluentui/react-icons';

const InfoIcon = bundleIcon(InfoFilled, InfoRegular);

/**
 * Given user props, defines default props for the DetailedText, and returns
 * processed states.
 *
 * @param props User provided props to the DetailedText component.
 * @param ref User provided ref to be passed to the DetailedText component.
 * @returns Processed states.
 */
export const useDetailedText: UseComponent<
  DetailedTextProps,
  DetailedTextStates
> = (props, ref) => {
  const { details, detailsIcon } = props;

  const resolvedDetails = resolveShorthand(details, {
    required: true,
    defaultProps: {},
  });

  const resolvedDetailsIcon = resolveShorthand(detailsIcon, {
    required: true,
    defaultProps: {
      children: <InfoIcon />,
    },
  });

  return {
    components: {
      root: Text,
      details: 'div',
      detailsIcon: 'div',
    },
    root: { ...props, ref },
    details: resolvedDetails,
    detailsIcon: resolvedDetailsIcon,
    children: props.children,
  };
};
