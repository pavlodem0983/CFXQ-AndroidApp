/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from '../../@types/theme';

/**
 * Colors
 */
export const Colors = {
  transparent: 'transparent',
  inputBackground: '#171A23',
  white: '#ffffff',
  //Typography
  textGray800: '#000000',
  textGray400: '#4D4D4D',
  textGray500: '#757575', //#000000 50%
  textGray200: '#A1A1A1', //placeholder
  primary: '#ffffff',
  secondary: '##9D9EA2',
  highlight: '#2AA9FB',
  gold: '#F2781E',
  success: '#28a745',
  error: '#E70C46',
  black: '#000000',
  label: '#ffffff',

  //ComponentColors
  circleButtonBackground: '#E1E1EF',
  circleButtonColor: '#44427D',

  // Button
  buttonPrimary: '#27ABFF',
  buttonSecondary: '#E71046',
  buttonClose: '#2E2E2E',
  buttonDisabled: '#757575',
  borderColor: '#515156',
  borderColorLight: "#B1B1B1",
  borderHighlight: '#464855',
  // Main Screens
  background: '#040309',
  backgroundHighlight: '#171A23',
  // Modal
  modalBackgroundColor: '#151922',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#EFEFEF',
  card: '#EFEFEF',
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: 12,
  small: 14,
  regular: 16,
  medium: 20,
  large: 32,
  xlarge: 40,
};

/**
 * Metrics Sizes
 */
const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export const FontFamilies = {
  bold: 'Mulish-Bold',
  extrabold: 'Mulish-ExtraBold',
  light: 'Mulish-Light',
  medium: 'Mulish-Medium',
  regular: 'Mulish-Regular',
  semibold: 'Mulish-SemiBold',
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
