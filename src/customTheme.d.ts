import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    toggleColorMode: () => {}
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    toggleColorMode?: () => {}
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}