import WebhookConfiguration from './WebhookConfiguration';

/**
 * Indicates an object of user configurations. This object should be stored in
 * `localStorage`.
 */
type UserConfiguration = {
  /** User specified theme. */
  theme: 'dark' | 'light' | 'system';
  /** Webhook-related configurations. */
  webhook: WebhookConfiguration;
};

export default UserConfiguration;
