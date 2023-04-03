import { UseComponent } from '@/types/UseComponent';
import {
  LabeledContentProps,
  LabeledContentStates,
} from './LabeledContent.types';
import {
  Label,
  getNativeElementProps,
  resolveShorthand,
} from '@fluentui/react-components';
import React from 'react';

/**
 * Given user props, defines default props for the LabeledContent, and returns
 * processed states.
 *
 * @param props User provided props to the LabeledContent component.
 * @param ref User provided ref to be passed to the LabeledContent component.
 * @returns Processed states.
 */
export const useLabeledContent: UseComponent<
  LabeledContentProps,
  LabeledContentStates
> = (props, ref) => {
  const { label, id } = props;
  const contentId = React.useId();

  const resolvedLabel = resolveShorthand(label, {
    required: true,
    defaultProps: { htmlFor: id ?? contentId },
  });

  return {
    components: {
      root: 'div',
      label: Label,
    },
    root: {
      ...getNativeElementProps('div', { ...props, ref }),
      id: id ?? contentId,
    },
    label: resolvedLabel,
  };
};
