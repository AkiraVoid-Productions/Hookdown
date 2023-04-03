export type ContextType = {
  /** The theme that users currently selected. */
  theme: 'light' | 'dark' | 'system';
  /**
   * Change the theme of site to specified theme.
   *
   * @param theme Target theme.
   */
  changeTheme: (theme: 'system' | 'light' | 'dark') => void;
  /** The actually applied theme of this site. */
  appliedTheme: 'light' | 'dark';
};
