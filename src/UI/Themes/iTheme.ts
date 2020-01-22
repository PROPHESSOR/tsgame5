export interface iThemeTextProps {
  color: string;
  font: string;
}

export interface iThemeBlockProps {
  borderSize: number;
  borderColor: string;
  background: string;
}

export interface iThemeTextBlockProps
  extends iThemeTextProps,
    iThemeBlockProps {}

export interface iThemeComponentProps {
  normal: iThemeTextBlockProps;
  active: iThemeTextBlockProps | {};
  hover: iThemeTextBlockProps | {};
  disabled: iThemeTextBlockProps | {};
}
