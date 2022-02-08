declare module "*.wav"
declare module "*.mp3"
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // 允许配置文件使用 `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}