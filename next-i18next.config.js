module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },
  fallbackLng: {
    default: ['en'],
  },
  reloadOnPrerender: process.env.NODE_ENV == 'development',
  missingKeyNoValueFallbackToKey: false,
};
