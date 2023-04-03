import { getSlots, Tooltip } from '@fluentui/react-components';
import { RenderComponent } from '../../types/RenderComponent';
import { CodeBlockSlots, CodeBlockStates } from './CodeBlock.types';

/**
 * Render the final JSX of CodeBlock.
 *
 * @param states States processed with user provided props and refs.
 * @returns The final JSX of CodeBlock.
 */
export const renderCodeBlock: RenderComponent<CodeBlockStates> = states => {
  const { slots, slotProps } = getSlots<CodeBlockSlots>(states);

  return (
    <slots.root {...slotProps.root}>
      {slots.codeInfo && (
        <slots.codeInfo {...slotProps.codeInfo}>
          {slots.languageTag && (
            <slots.languageTag {...slotProps.languageTag} />
          )}
          <Tooltip
            relationship='label'
            content={
              states.isCopied
                ? states.strings.copiedTip ?? ''
                : states.strings.copyTip ?? ''
            }
          >
            {slots.copyButton && <slots.copyButton {...slotProps.copyButton} />}
          </Tooltip>
        </slots.codeInfo>
      )}
      {slots.code && (
        <slots.code {...slotProps.code}>{slotProps.root.children}</slots.code>
      )}
    </slots.root>
  );
};
