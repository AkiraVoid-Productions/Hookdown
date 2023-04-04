import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  Theme,
} from '@fluentui/react-components';
import * as React from 'react';
import ThemeContext, { ThemeContextType } from '../contexts/Theme';
import { getConfig, setConfig } from './userConfig';

const brandColors: BrandVariants = {
  10: '#000000',
  20: '#14121C',
  30: '#1F1E32',
  40: '#2B2A4A',
  50: '#383763',
  60: '#44447D',
  70: '#515298',
  80: '#6060AF',
  90: '#7170BF',
  100: '#8280CD',
  110: '#9491DA',
  120: '#A6A2E5',
  130: '#B8B4EE',
  140: '#CAC6F5',
  150: '#DCD9FB',
  160: '#EEECFE',
};

const lightTheme: Theme = {
  ...createLightTheme(brandColors),
  fontFamilyMonospace: `Consolas, 'Cascadia Code', 'Courier New', Courier, monospace`,
};
const darkTheme: Theme = {
  ...createDarkTheme(brandColors),
  fontFamilyMonospace: `Consolas, 'Cascadia Code', 'Courier New', Courier, monospace`,
};

/**
 * Get user specified theme.
 *
 * @returns {'light' | 'dark' | 'system'} User specified theme.
 */
const getUserThemeConfig = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const setting = getConfig().theme;
  if (
    !setting ||
    (setting !== 'dark' && setting !== 'light' && setting !== 'system')
  ) {
    setConfig({ theme: 'system' });
    return 'system';
  }
  return setting;
};

/**
 * Get the theme of browser.
 *
 * @returns {'light' | 'dark'} Browser theme.
 */
const getSystemTheme = () => {
  if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    return 'light';
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'light';
};

/**
 * Get the theme object by theme configuration.
 *
 * @param {'light' | 'dark' | 'system'} config Theme configuration.
 * @returns {Theme} Theme object
 */
const getTheme: (config: 'system' | 'dark' | 'light') => Theme = config => {
  if (config === 'dark') {
    return darkTheme;
  }
  if (config === 'light') {
    return lightTheme;
  }
  return getTheme(getSystemTheme());
};

/**
 * A react hook that can be used to get current theme and theme configuration,
 * or change the theme.
 *
 * @returns A object that contains properties to get current theme and theme
 *   configuration, or change the theme.
 */
const useTheme = () => {
  const context = React.useContext(ThemeContext);

  return { ...context };
};

export {
  lightTheme,
  darkTheme,
  getSystemTheme,
  getTheme,
  getUserThemeConfig,
  useTheme,
};
