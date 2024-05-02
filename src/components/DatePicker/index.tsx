import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Button, Pressable } from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import { DatePickerProps } from './type';
import { useTheme } from '@hooks';
import Text from '../Text';
import moment from 'moment';

const DatePicker = ({
  label,
  error,
  onChange,
  value,
  containerStyle,
}: DatePickerProps) => {
  const { Colors, Fonts, Gutters, Layout } = useTheme();

  const [open, setOpen] = useState(false);

  const inputStyles = useMemo(() => {
    return StyleSheet.create({
      input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.inputBackground,
        color: Colors.white,
        borderWidth: 1.2,
        borderColor: error ? Colors.error : Colors.inputBackground,
        height: 45,
        paddingHorizontal: 10,
        borderRadius: 5,
        shadowColor: error ? Colors.error : Colors.buttonPrimary,
        shadowOffset: {
          width: 1,
          height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 2.5,
        elevation: 5,
      },
      error: {
        position: 'absolute',
        right: 0,
      },
    });
  }, [Colors]);

  const onConfirm = (_value: any) => {
    setOpen(false);
    onChange && onChange(_value);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <View style={[Gutters.smallTMargin, containerStyle]}>
      {label && (
        <Text mb={8} weight="bold" color="white">
          {label}
        </Text>
      )}
      <View style={[inputStyles.input]}>
        <Text color="highlight">{moment(value).format('YYYY-MM-DD')}</Text>
        <Pressable onPress={() => setOpen(true)}>
          <Text color="highlight" size="small" weight="bold">
            Change
          </Text>
        </Pressable>
      </View>
      <RNDatePicker
        modal
        open={open}
        mode="date"
        date={value}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
