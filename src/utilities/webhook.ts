import WebhookConfigurationContext from '@/contexts/WebhookConfiguration';
import WebhookConfiguration from '@/types/WebhookConfiguration';
import { useContext } from 'react';

/**
 * A React hook that can be used to get user configurations of webhook.
 *
 * @returns {WebhookConfiguration} User configurations of webhook.
 * @export
 */
export function useWebhookConfiguration() {
  const config = useContext(WebhookConfigurationContext);

  return config;
}

/**
 * Make a webhook request using given parameters.
 *
 * @param {string} texts The texts that need to be sent to webhook.
 * @param {WebhookConfiguration} config The user configurations of webhook.
 * @returns {Promise<any>} An async promise that could be resolved to the
 *   response of webhook.
 * @export
 */
export async function sendTextsAsync(
  texts: string,
  config: WebhookConfiguration
) {
  const headers = new Headers();
  if (config.headers) {
    for (const key in config.headers) {
      headers.append(key, config.headers[key]);
    }
  }

  if (config.method && config.method !== 'GET') {
    if (!headers.get('Content-Type')) {
      headers.append('Content-Type', 'application/json');
    }
  }

  const result = await fetch(
    config.method === 'GET' || config.method === undefined
      ? `${config.url}${
          config.url[config.url.length - 1] === '?' ? '&' : '?'
        }${encodeURIComponent(
          config.parameterName && config.parameterName !== ''
            ? config.parameterName
            : 'texts'
        )}=${encodeURIComponent(texts)}`
      : config.url,
    {
      method: config.method ?? 'GET',
      headers,
      body:
        config.method && config.method !== 'GET'
          ? JSON.stringify({ [config.parameterName ?? 'texts']: texts })
          : undefined,
    }
  );

  if (!result.ok) {
    throw await result.json();
  }

  return await result.json();
}
