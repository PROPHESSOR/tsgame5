import { iThemeTextBlockProps, iThemeComponentProps } from './iTheme';

export default {
  Button: {
    normal: {
      background: 'black',
      borderColor: 'red',
      color: 'red',
      borderSize: 1,
      font: '20px monospace',
    } as iThemeTextBlockProps,
    active: {
      borderColor: 'green',
      borderSize: 2,
    },
    disabled: {
      color: 'gray',
      borderColor: 'gray',
    },
    hover: {
      background: '#550000',
    },
  } as iThemeComponentProps,
  Text: {
    normal: {
      background: 'transparent',
      borderColor: 'transparent',
      color: 'red',
      borderSize: 0,
      font: '20px monospace',
    } as iThemeTextBlockProps,
    disabled: {
      color: 'gray',
    },
  } as iThemeComponentProps,
};
