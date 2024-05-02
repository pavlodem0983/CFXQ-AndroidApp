import { PropsWithChildren } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type TextColorTypes =
  | 'primary'
  | 'secondary'
  | 'label'
  | 'white'
  | 'black'
  | 'textGray800'
  | 'textGray500'
  | 'textGray400'
  | 'textGray200'
  | 'success'
  | 'highlight'
  | 'gold'
  | 'error';

export type TextSizeTypes =
  | 'tiny'
  | 'small'
  | 'regular'
  | 'medium'
  | 'large'
  | 'xlarge';
export type TextWeightTypes =
  | 'bold'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semibold'
  | 'extrabold';

export type TextPropTypes = PropsWithChildren<{
  color?: TextColorTypes;
  size?: TextSizeTypes;
  weight?: TextWeightTypes;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  underline?: boolean;
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}>;

export default TextPropTypes;
