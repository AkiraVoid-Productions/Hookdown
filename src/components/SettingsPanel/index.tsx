import { useTranslation } from 'next-i18next';
import Panel from '../Panel';
import SettingsGroup from '../SettingsGroup';
import ThemeSelector from '../ThemeSelector';
import { useMarkdownProcessor } from '@/utilities/common';
import {
  Combobox,
  Input,
  Link,
  Option,
  Switch,
  Text,
  Textarea,
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
} from '@fluentui/react-components';
import React from 'react';
import { useWebhookConfiguration } from '@/utilities/webhook';
import LabeledContent from '../LabeledContent';
import DetailedText from '../DetailedText';
import MarkdownProcessor from '@/helpers/MarkdownProcessor';
import Blockquote from '../Blockquote';
import CodeBlock from '../CodeBlock';

const useStyles = makeStyles({
  description: {
    color: tokens.colorNeutralForeground2,
    display: 'block',
    ...shorthands.margin(tokens.spacingVerticalM, 0),
    ...typographyStyles.body1,
  },
  itemGap: {
    marginBottom: tokens.spacingVerticalS,
    width: '100%',
  },
});

/** A simple component of standard settings panel. */
function SettingsPanel(props: { isOpened: boolean; onDismiss: () => void }) {
  const { t } = useTranslation('common', { keyPrefix: 'settings' });
  const processor = useMarkdownProcessor();
  const [processorRecords, setProcessorRecords] = React.useState(
    JSON.parse(JSON.stringify(processor))
  );
  const classNames = useStyles();
  const webhookConfiguration = useWebhookConfiguration();
  const [headerString, setHeaderString] = React.useState('');
  const hintProcessor = React.useMemo(() => {
    const markdownProcessor = new MarkdownProcessor();
    markdownProcessor.shouldUseGfm = false;
    markdownProcessor.shouldUseHeaderSlug = false;
    markdownProcessor.shouldUseKaTeX = false;
    markdownProcessor.highlightOptions = {
      ...markdownProcessor.highlightOptions,
      detect: false,
    };
    markdownProcessor.reactOptions = {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
          <Link {...props} inline />
        ),
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
          <CodeBlock {...props} codeInfo={null} />
        ),
        blockquote: (props: React.BlockquoteHTMLAttributes<HTMLElement>) => (
          <Blockquote {...props} />
        ),
      },
    };
    return markdownProcessor;
  }, []);

  React.useEffect(() => {
    try {
      webhookConfiguration.configure('headers', JSON.parse(headerString));
    } catch {
      webhookConfiguration.configure('headers', {});
    }
  }, [headerString, webhookConfiguration]);

  React.useEffect(() => {
    processor.propertyChanged.add((_sender, args) => {
      setProcessorRecords({
        ...processorRecords,
        [`_${args.propertyName}`]: args.newValue,
      });
    });
  }, [processor, processorRecords]);

  return (
    <Panel
      isOpened={props.isOpened}
      isLightDismiss
      headerText={t('header')}
      onDismiss={props.onDismiss}
    >
      <Text wrap className={classNames.description}>
        {t('description')}
      </Text>
      <SettingsGroup header={t('groups.appearance')}>
        <ThemeSelector />
      </SettingsGroup>
      <SettingsGroup header={t('groups.serialization')}>
        <Switch
          checked={processorRecords._shouldUseGfm}
          onChange={(_e, _data) => {
            processor.shouldUseGfm = !processor.shouldUseGfm;
          }}
          label={
            <DetailedText
              details={
                hintProcessor.process(
                  t('serialization.gfm.hint')
                ) as JSX.Element
              }
            >
              {t('serialization.gfm')}
            </DetailedText>
          }
          labelPosition='after'
        />
        <Switch
          checked={processorRecords._shouldUseExternalLink}
          onChange={(_e, _data) => {
            processor.shouldUseExternalLink = !processor.shouldUseExternalLink;
          }}
          label={
            <DetailedText
              details={
                hintProcessor.process(
                  t('serialization.externalLink.hint')
                ) as JSX.Element
              }
            >
              {t('serialization.externalLink')}
            </DetailedText>
          }
          labelPosition='after'
        />
        <Switch
          checked={processorRecords._shouldHighlightCode}
          onChange={(_e, _data) => {
            processor.shouldHighlightCode = !processor.shouldHighlightCode;
          }}
          label={t('serialization.highlightCode')}
          labelPosition='after'
        />
        <Switch
          checked={processorRecords._highlightOptions.detect}
          onChange={(_e, _data) => {
            processor.highlightOptions = {
              ...processor.highlightOptions,
              detect: !processor.highlightOptions.detect,
            };
          }}
          label={t('serialization.detectCode')}
          labelPosition='after'
        />
        <Switch
          checked={processorRecords._shouldUseHeaderSlug}
          onChange={(_e, _data) => {
            processor.shouldUseHeaderSlug = !processor.shouldUseHeaderSlug;
          }}
          label={t('serialization.headerSlug')}
          labelPosition='after'
        />
        <Switch
          checked={processorRecords._shouldUseKaTeX}
          onChange={(_e, _data) => {
            processor.shouldUseKaTeX = !processor.shouldUseKaTeX;
          }}
          label={
            <DetailedText
              details={
                hintProcessor.process(
                  t('serialization.kaTeX.hint')
                ) as JSX.Element
              }
            >
              {t('serialization.kaTeX')}
            </DetailedText>
          }
          labelPosition='after'
        />
      </SettingsGroup>
      <SettingsGroup header={t('groups.webhook')}>
        <LabeledContent label={t('webhook.url')}>
          <Input
            className={classNames.itemGap}
            placeholder='https://example.com/api/articles'
            onChange={(_e, data) =>
              webhookConfiguration.configure('url', data.value)
            }
            value={webhookConfiguration.url}
          />
        </LabeledContent>
        <LabeledContent
          label={
            <DetailedText
              details={
                hintProcessor.process(
                  t('webhook.parameterName.hint')
                ) as JSX.Element
              }
            >
              {t('webhook.parameterName')}
            </DetailedText>
          }
        >
          <Input
            className={classNames.itemGap}
            placeholder='texts'
            onChange={(_e, data) =>
              webhookConfiguration.configure('parameterName', data.value)
            }
            value={webhookConfiguration.parameterName}
          />
        </LabeledContent>
        <LabeledContent
          label={
            <DetailedText
              details={
                hintProcessor.process(t('webhook.method.hint')) as JSX.Element
              }
            >
              {t('webhook.method')}
            </DetailedText>
          }
        >
          <Combobox
            className={classNames.itemGap}
            placeholder='GET'
            selectedOptions={[webhookConfiguration.method ?? 'get']}
            value={webhookConfiguration.method}
            onOptionSelect={(_e, data) =>
              webhookConfiguration.configure(
                'method',
                data.optionText as 'GET' | 'POST' | 'PATCH' | 'PUT'
              )
            }
          >
            <Option>GET</Option>
            <Option>POST</Option>
            <Option>PUT</Option>
            <Option>PATCH</Option>
          </Combobox>
        </LabeledContent>
        <LabeledContent
          label={
            <DetailedText
              details={
                hintProcessor.process(t('webhook.headers.hint')) as JSX.Element
              }
            >
              {t('webhook.headers')}
            </DetailedText>
          }
        >
          <Textarea
            className={classNames.itemGap}
            placeholder={'{\n  "key": "value"\n}'}
            resize='both'
            defaultValue={JSON.stringify(webhookConfiguration.headers)}
            onChange={(_e, data) => setHeaderString(data.value)}
          />
        </LabeledContent>
      </SettingsGroup>
    </Panel>
  );
}

export default SettingsPanel;
