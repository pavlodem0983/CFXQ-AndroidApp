import { ViewProps } from 'react-native';
import{ PhoneInputProps as RNPhoneInputProps } from "react-native-phone-number-input";

export type PhoneInputProps = RNPhoneInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewProps['style'];
  onChange?: (value: any) => void;
};
