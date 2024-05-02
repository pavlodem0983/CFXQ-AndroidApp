import { ViewProps } from 'react-native';

export type DatePickerProps = ViewProps & {
  label?: string;
  error?: string;
  onChange?: (value: any) => void;
  value: Date;
  containerStyle?: ViewProps['style']
};
