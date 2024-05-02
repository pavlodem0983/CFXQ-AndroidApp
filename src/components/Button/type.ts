import { TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary' | 'text' | 'close';
  title?: string;
};
