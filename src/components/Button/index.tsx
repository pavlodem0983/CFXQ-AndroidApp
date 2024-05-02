import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { ButtonProps } from './type';
import { useTheme } from '@hooks';

const Button = ({
  title,
  variant = 'primary',
  children,
  disabled = false,
  color,
  style,
  ...props
}: ButtonProps) => {
  const { Colors } = useTheme();

  const backgrounds = useMemo(() => {
    return {
      primary: Colors.buttonPrimary,
      secondary: Colors.buttonSecondary,
      close: Colors.buttonClose,
      text: 'transparent',
    };
  }, []);

  const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: disabled ? Colors.buttonDisabled : backgrounds[variant],
      borderRadius: 6,
      height: 42,
      justifyContent: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      disabled={disabled}
      {...props}
    >
      {children ? (
        children
      ) : (
        <Text color={color} align="center" weight="bold" size="regular">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
