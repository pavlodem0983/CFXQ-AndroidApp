import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Balance } from './main';

export type AuthParamList = {
  AuthHome: undefined;
  ForgotPassword: undefined;
  VerifyPhone: {
    phoneNumber: string;
  };
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthParamList>;
  Main: NavigatorScreenParams<TabNavigatorParams>;
};

export type ApplicationScreenProps<T> = StackScreenProps<
  ApplicationStackParamList,
  T
>;

export type AuthenticationScreenProps<T> = StackScreenProps<AuthParamList, T>;

// Main Tab stack
export type TabNavigatorParams = {
  Home: NavigatorScreenParams<CasaStackNavigatorParams>;
  Exchange: undefined;
  Plus: undefined;
  Conto: undefined;
};

// Casa Stack
export type CasaStackNavigatorParams = {
  Casa: undefined;
  Asset: { asset: Balance };
  // Cash: { asset: Asset };
};

export type CasaStackScreenProps = StackScreenProps<CasaStackNavigatorParams>;

// Exchange Stack
export type ExchangeStackNavigatorParams = {
  Exchange: undefined;
  TradeView: undefined;
};

export type ExchangeStackScreenProps =
  StackScreenProps<ExchangeStackNavigatorParams>;

// Settings (Conto) Stack
export type AccountStackNavigatorParams = {
  Setting: undefined;
  AccountHome: undefined;
  Account: undefined;
  Financial: undefined;
  MyWallets: undefined;
  Security: undefined;
  Settings: undefined;
  VerifyEmail: undefined;
  VerifyPhone: undefined;
};

export type AccountStackScreenProps =
  StackScreenProps<AccountStackNavigatorParams>;
