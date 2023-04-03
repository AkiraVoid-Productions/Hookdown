import { FluentProvider } from '@fluentui/react-components';
import * as React from 'react';
import ThemeContext from '../../contexts/Theme';
import {
  getSystemTheme,
  getTheme,
  getUserThemeConfig,
} from '../../utilities/theme';
import { setConfig } from '../../utilities/userConfig';

/**
 * This component provide themes and styles to all of its children, with the
 * ability to change the theme of the entire site by using the hook `useTheme`
 * inside every children component.
 */
const Component: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [themeConfig, setThemeConfig] = React.useState<
    'light' | 'dark' | 'system'
  >('light');
  const [theme, setTheme] = React.useState(() => getTheme(themeConfig));
  const [appliedTheme, setAppliedTheme] = React.useState<'light' | 'dark'>(
    'light'
  );

  const darkModeQueryRef = React.useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : undefined
  );
  const listenerRef = React.useRef<(() => any) | undefined>(undefined);

  const systemThemeListener = React.useCallback(function (
    this: MediaQueryList
  ) {
    const systemTheme = getSystemTheme();
    setTheme(getTheme(systemTheme));
    setAppliedTheme(systemTheme);
  },
  []);

  React.useEffect(() => {
    setTheme(getTheme(themeConfig));
    if (typeof window !== 'undefined' && !darkModeQueryRef.current) {
      darkModeQueryRef.current = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
    }
    if (themeConfig === 'system') {
      if (listenerRef.current) {
        darkModeQueryRef.current!.removeEventListener(
          'change',
          listenerRef.current
        );
      }
      setAppliedTheme(getSystemTheme());
      darkModeQueryRef.current!.addEventListener('change', systemThemeListener);
      listenerRef.current = systemThemeListener;
    } else {
      setAppliedTheme(themeConfig);
      if (listenerRef.current) {
        darkModeQueryRef.current!.removeEventListener(
          'change',
          listenerRef.current
        );
        listenerRef.current = undefined;
      }
    }
  }, [systemThemeListener, themeConfig]);

  const changeTheme = React.useCallback(
    (config: 'light' | 'dark' | 'system') => {
      setThemeConfig(config);
      setConfig({ theme: config });
    },
    []
  );

  // 在客户端上渲染时先行匹配客户端主题设置。
  React.useEffect(() => {
    setThemeConfig(getUserThemeConfig());
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme: themeConfig, appliedTheme, changeTheme }}
    >
      <FluentProvider theme={theme}>{children}</FluentProvider>
    </ThemeContext.Provider>
  );
};

Component.displayName = 'ThemeProvider';

export { Component };
