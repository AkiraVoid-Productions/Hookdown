import {
  createDOMRenderer,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  makeStaticStyles,
} from '@fluentui/react-components';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import ThemeProvider from '@/components/ThemeProvider';
import MarkdownProcessorProvider from '@/components/MarkdownProcessorProvider';
import WebhookConfigurationProvider from '@/components/WebhookConfigurationProvider';

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

const useStaticStyles = makeStaticStyles({
  'html,body,#__next,#__next>.fui-FluentProvider': {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
});

function HookdownApp({ Component, pageProps, renderer }: EnhancedAppProps) {
  useStaticStyles();

  return (
    // 👇 Accepts a renderer from <Document /> or creates a default one
    //    Also triggers rehydration a client
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProvider>
        <ThemeProvider>
          <MarkdownProcessorProvider>
            <WebhookConfigurationProvider>
              <Component {...pageProps} />
            </WebhookConfigurationProvider>
          </MarkdownProcessorProvider>
        </ThemeProvider>
      </SSRProvider>
    </RendererProvider>
  );
}

export default appWithTranslation(HookdownApp);
