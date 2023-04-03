import { WebhookConfigurationContextValue } from './WebhookConfiguration.types';

/** The default webhook configurations. */
export const defaultWebhookConfiguration: WebhookConfigurationContextValue = {
  url: '',
  method: 'GET',
  parameterName: 'tests',
  headers: {},
  configure: () => {},
};
