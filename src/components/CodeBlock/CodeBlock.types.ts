import { IComponentStrings } from '@/types/IComponentStrings';
import {
  Badge,
  Button,
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-components';

export type CodeBlockSlots = {
  root: Slot<'pre'>;
  code?: Slot<'code'>;
  languageTag?: Slot<typeof Badge>;
  copyButton?: Slot<typeof Button>;
  codeInfo?: Slot<'div'>;
};

export type CodeBlockProps = ComponentProps<CodeBlockSlots> &
  IComponentStrings<'copyTip' | 'copiedTip'> & {
    /**
     * Indicates that a button used to copy code inside should or should not be
     * shown.
     */
    showCopyButton?: boolean;
    /**
     * Language of code, used to display a language tag on the top-left corner.
     *
     * Set `languageTag = null` to avoid language tag rendering.
     */
    language?: string;
  };

export type CodeBlockStates = ComponentState<CodeBlockSlots> &
  Required<Pick<CodeBlockProps, 'showCopyButton' | 'strings'>> & {
    isCopied: boolean;
  };
