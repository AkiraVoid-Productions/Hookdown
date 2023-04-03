import { useIds } from '@/utilities/common';
import {
  ToolbarProps,
  Toolbar,
  ToolbarGroup,
  Tooltip,
  ToolbarButton,
  ToolbarDivider,
  Spinner,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
} from '@fluentui/react-components';
import {
  Settings20Regular,
  CodeRegular,
  TextQuoteRegular,
  LinkRegular,
  TextItalicRegular,
  TextBoldRegular,
  TextNumberListLtrRegular,
  TextBulletListLtrRegular,
  CodeBlockRegular,
  ImageRegular,
  TextHeader1Regular,
  TextHeader2Regular,
  TextHeader3Regular,
  TextParagraphRegular,
  SendRegular,
} from '@fluentui/react-icons';
import { editor } from 'monaco-editor';
import { useTranslation } from 'react-i18next';
import ToolbarButtonWithTooltip, {
  ToolbarButtonWithTooltipProps,
} from './ToolbarButtonWithTooltip';
import { useCallback, useMemo } from 'react';
import EditorManager from '@/helpers/EditorManager';
import SettingsPanel from '../SettingsPanel';
import React from 'react';
import { sendTextsAsync, useWebhookConfiguration } from '@/utilities/webhook';

/** A simple component of editor's toolbar. */
function EditorToolbar(
  props: ToolbarProps & { editor?: editor.IStandaloneCodeEditor }
) {
  const { t } = useTranslation('common');
  const ids = useIds(15);
  const [isSettingsPanelOpened, setIsSettingsPanelOpened] =
    React.useState(false);
  const webhookConfiguration = useWebhookConfiguration();
  const [isSending, setIsSending] = React.useState(false);
  const [sendingState, setSendingState] = React.useState<'success' | 'error'>();

  const getTranslation = useCallback(
    (key: string) => t(`toolbar.${key}.tooltip`),
    [t]
  );

  const editorManager = useMemo(
    () => (props.editor ? new EditorManager(props.editor) : undefined),
    [props.editor]
  );

  const inlineTools = useMemo<ToolbarButtonWithTooltipProps[]>(
    () => [
      {
        tooltip: getTranslation('bold'),
        id: ids[0],
        icon: <TextBoldRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addInlineMarks(
              '**$**',
              editorManager.createRange(0, 2, 0, 2)
            );
          }
        },
      },
      {
        tooltip: getTranslation('italic'),
        id: ids[1],
        icon: <TextItalicRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addInlineMarks(
              '*$*',
              editorManager.createRange(0, 1, 0, 1)
            );
          }
        },
      },
      {
        tooltip: getTranslation('link'),
        id: ids[2],
        icon: <LinkRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addInlineMarks(
              '[$](https://)',
              editorManager.createRange(0, 1, 0, 1)
            );
          }
        },
      },
      {
        tooltip: getTranslation('code'),
        id: ids[3],
        icon: <CodeRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addInlineMarks(
              '`$`',
              editorManager.createRange(0, 1, 0, 1)
            );
          }
        },
      },
    ],
    [editorManager, getTranslation, ids]
  );
  const blockTools = useMemo<ToolbarButtonWithTooltipProps[]>(
    () => [
      {
        tooltip: getTranslation('h1'),
        id: ids[4],
        icon: <TextHeader1Regular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('# $', 2);
          }
        },
      },
      {
        tooltip: getTranslation('h2'),
        id: ids[5],
        icon: <TextHeader2Regular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('## $', 3);
          }
        },
      },
      {
        tooltip: getTranslation('h3'),
        id: ids[6],
        icon: <TextHeader3Regular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('### $', 4);
          }
        },
      },
      {
        tooltip: getTranslation('paragraph'),
        id: ids[7],
        icon: <TextParagraphRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('$', 0);
          }
        },
      },
      {
        tooltip: getTranslation('quote'),
        id: ids[8],
        icon: <TextQuoteRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('> $', 2);
          }
        },
      },
      {
        tooltip: getTranslation('codeBlock'),
        id: ids[9],
        icon: <CodeBlockRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            const beforeText = editorManager.getTextBeforeSelection();
            const selectedText = editorManager.selectedText;
            const selection = editorManager.editor.getSelection();
            const range = selection
              ? editorManager.createRangeBySelection(selection)
              : editorManager.getDefaultRange();
            editorManager.addBlockMarksWithRangeOffset('```text\n$\n```');
            editorManager.editor.setSelection(
              editorManager.createRange(
                beforeText
                  ? range.startLineNumber + 3
                  : range.startLineNumber + 1,
                1,
                beforeText ? range.endLineNumber + 3 : range.endLineNumber + 1,
                (selectedText?.length ?? 0) + 1
              )
            );
          }
        },
      },
      {
        tooltip: getTranslation('bulletList'),
        id: ids[10],
        icon: <TextBulletListLtrRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('- $', 2);
          }
        },
      },
      {
        tooltip: getTranslation('numberList'),
        id: ids[11],
        icon: <TextNumberListLtrRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('1. $', 3);
          }
        },
      },
      {
        tooltip: getTranslation('image'),
        id: ids[12],
        icon: <ImageRegular />,
        onMouseDown: e => {
          e.preventDefault();
          if (editorManager) {
            editorManager.addBlockMarks('![$]()', 2);
          }
        },
      },
    ],
    [editorManager, getTranslation, ids]
  );

  return (
    <Toolbar {...props}>
      <ToolbarGroup role='presentation'>
        {inlineTools.map(tool => (
          <ToolbarButtonWithTooltip
            {...tool}
            key={`${tool.id}-toolBarButton`}
          />
        ))}
      </ToolbarGroup>

      <ToolbarDivider />

      <ToolbarGroup>
        {blockTools.map(tool => (
          <ToolbarButtonWithTooltip
            {...tool}
            key={`${tool.id}-toolBarButton`}
          />
        ))}
      </ToolbarGroup>

      <ToolbarDivider />

      <ToolbarGroup role='presentation'>
        <Tooltip relationship='label' content={getTranslation('settings')}>
          <ToolbarButton
            itemID={ids[13]}
            icon={<Settings20Regular />}
            onClick={() => setIsSettingsPanelOpened(!isSettingsPanelOpened)}
          />
        </Tooltip>
        <Tooltip
          relationship='label'
          content={
            isSending ? getTranslation('sending') : getTranslation('send')
          }
        >
          <ToolbarButton
            itemID={ids[14]}
            icon={isSending ? <Spinner size='tiny' /> : <SendRegular />}
            onClick={() => {
              setIsSending(true);
              sendTextsAsync(
                props.editor?.getValue() ?? '',
                webhookConfiguration
              )
                .then(() => setSendingState('success'))
                .catch(() => setSendingState('error'))
                .finally(() => setIsSending(false));
            }}
          />
        </Tooltip>
      </ToolbarGroup>

      <SettingsPanel
        isOpened={isSettingsPanelOpened}
        onDismiss={() => setIsSettingsPanelOpened(false)}
      />

      <Dialog modalType='alert' open={sendingState !== undefined}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              {t(`toolbar.dialog.title.${sendingState}`)}
            </DialogTitle>
            <DialogContent>
              {t(`toolbar.dialog.content.${sendingState}`)}
            </DialogContent>
            <DialogActions>
              <Button
                appearance='primary'
                onClick={() => setSendingState(undefined)}
              >
                {t('toolbar.dialog.ok')}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </Toolbar>
  );
}

export default EditorToolbar;
