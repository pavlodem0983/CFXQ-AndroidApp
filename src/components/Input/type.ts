import { TextInputProps, ViewProps } from 'react-native';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewProps['style'];
};
