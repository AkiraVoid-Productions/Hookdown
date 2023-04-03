import UserConfiguration from '../types/UserConfiguration';

/**
 * Get user configurations which were stored in `localStorage`.
 *
 * @returns User configurations
 */
export const getConfig = () => {
  const config = localStorage.getItem('userConfig');
  if (!config) {
    localStorage.setItem('userConfig', '{}');
    return {} as Partial<UserConfiguration>;
  }
  return JSON.parse(config) as Partial<UserConfiguration>;
};

/**
 * Set user configurations. The new configuration will replace the old one.
 *
 * @param config The user configurations object that contains changed
 *   properties.
 */
export const setConfig = (config: Partial<UserConfiguration>) => {
  const storage = localStorage.getItem('userConfig');
  if (!storage) {
    localStorage.setItem('userConfig', JSON.stringify(config));
    return {};
  }
  localStorage.setItem(
    'userConfig',
    JSON.stringify({ ...JSON.parse(storage), ...config })
  );
};
