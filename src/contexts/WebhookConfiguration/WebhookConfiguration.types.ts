import WebhookConfiguration from '@/types/WebhookConfiguration';

export type WebhookConfigurationContextValue = WebhookConfiguration & {
  configure: <T extends keyof WebhookConfiguration>(
    key: T,
    value: WebhookConfiguration[T]
  ) => void;
};
