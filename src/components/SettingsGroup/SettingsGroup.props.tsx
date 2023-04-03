import { UseComponent } from '@/types/UseComponent';
import { SettingsGroupProps, SettingsGroupStates } from './SettingsGroup.types';
import {
  Text,
  getNativeElementProps,
  resolveShorthand,
} from '@fluentui/react-components';

/**
 * Given user props, defines default props for the SettingsGroup, and returns
 * processed states.
 *
 * @param props User provided props to the SettingsGroup component.
 * @param ref User provided ref to be passed to the SettingsGroup component.
 * @returns Processed states.
 */
export const useSettingsGroup: UseComponent<
  SettingsGroupProps,
  SettingsGroupStates
> = (props, ref) => {
  const { header, itemContainer, children } = props;

  const resolvedHeader = resolveShorthand(header, {
    required: true,
    defaultProps: {},
  });

  const resolvedItemContainer = resolveShorthand(itemContainer, {
    required: true,
    defaultProps: {},
  });

  return {
    components: {
      root: 'section',
      header: Text,
      itemContainer: 'div',
    },
    header: resolvedHeader,
    itemContainer: resolvedItemContainer,
    root: getNativeElementProps(props.as ?? 'section', { ...props, ref }),
    children,
  };
};
