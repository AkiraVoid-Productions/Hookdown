type WebhookConfiguration = {
  /** Webhook URL. */
  url: string;
  /** The parameter name which will be used as key when passing texts to webhook. */
  parameterName?: string;
  /** The HTTP method used to make webhook request. */
  method: 'GET' | 'POST' | 'PATCH' | 'PUT';
  /** The headers that should be attached to webhook request. */
  headers: Record<string, string>;
};

export default WebhookConfiguration;
