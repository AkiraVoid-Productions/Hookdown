import WebhookConfigurationContext from '@/contexts/WebhookConfiguration';
import WebhookConfiguration from '@/types/WebhookConfiguration';
import { useInitializedEffect } from '@/utilities/common';
import { setConfig } from '@/utilities/userConfig';
import { getConfig } from '@/utilities/userConfig';
import React from 'react';

/**
 * A simple component that provide an object stored globally and refers to the
 * webhook user configurations.
 */
function WebhookConfigurationProvider(props: React.PropsWithChildren) {
  const [url, setUrl] = React.useState('');
  const [parameterName, setParameterName] = React.useState<string>('texts');
  const [method, setMethod] = React.useState<'GET' | 'POST' | 'PUT' | 'PATCH'>(
    'GET'
  );
  const [headers, setHeaders] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const config = getConfig();

    setUrl(config.webhook?.url ?? '');
    setParameterName(
      config.webhook?.parameterName && config.webhook.parameterName !== ''
        ? config.webhook.parameterName
        : 'texts'
    );
    setMethod(
      config.webhook?.method && (config.webhook.method as string) !== ''
        ? config.webhook.method
        : 'GET'
    );
    setHeaders(config.webhook?.headers ?? {});
  }, []);

  const configure = React.useCallback(
    <T extends keyof WebhookConfiguration>(
      key: T,
      value: WebhookConfiguration[T]
    ) => {
      switch (key) {
        case 'url':
          setUrl(value as string);
          break;
        case 'method':
          setMethod(value as 'GET' | 'POST' | 'PUT' | 'PATCH');
          break;
        case 'parameterName':
          setParameterName(value as string);
          break;
        case 'headers':
          setHeaders(value as Record<string, string>);
        default:
          break;
      }
    },
    []
  );

  useInitializedEffect(() => {
    setConfig({
      webhook: {
        url,
        parameterName,
        method,
        headers,
      },
    });
  }, [url, parameterName, method, headers]);

  return (
    <WebhookConfigurationContext.Provider
      value={{ url, parameterName, method, headers, configure }}
    >
      {props.children}
    </WebhookConfigurationContext.Provider>
  );
}

export default WebhookConfigurationProvider;
