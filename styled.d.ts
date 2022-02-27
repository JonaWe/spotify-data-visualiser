import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fcPrimary: string;
    fcULight: string;
    fcLight: string;
    accentColor: string;
    dangerColor: string;
    bgMDark: string;
    bgDark: string;
    bgPrimary: string;
    bgSecondary: string;
    isDarkTheme: boolean;
  }
}
