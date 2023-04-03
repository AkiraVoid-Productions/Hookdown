import { createContext } from 'react';
import { WebhookConfigurationContextValue } from './WebhookConfiguration.types';
import { defaultWebhookConfiguration } from './WebhookConfiguration.values';

/**
 * A React context which stores an object globally that refers to the user
 * webhook settings.
 */
export const context = createContext<WebhookConfigurationContextValue>(
  defaultWebhookConfiguration
);
