import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@store'
import _ from 'lodash'
import { TokenPrice } from 'types/main'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useCurrency = () => {
  const appState = useAppSelector(state => state.app);
  if (!appState.AccessToken || !appState.user) {
    return {
      currency: 'USD',
      symbol: '$'
    }
  }

  const currency = appState.user.preferredCurrency ?? "USD";
  const symbol = currency?.toUpperCase() === "USD" ? '$' : '€';

  return { currency, symbol}
}

export const usePrice = (tokenId: number, currency: string = "") => {
  const appState = useAppSelector(state => state.app);
  const defaultValue: TokenPrice = {
    unitValue: 0,
    token: 0,
    currencyTo: '',
    timestamp: ''
  }
  if (!appState.AccessToken || !appState.user) return defaultValue;

  const _currency = _.isEmpty(currency) ? (appState.user.preferredCurrency ?? 'USD') : currency
  const tokenType = appState.tokenTypes.find(t => t.id === tokenId);
  if (!tokenType) return defaultValue;

  const price = tokenType.tokenPrices.find(tp => tp.currencyTo.toUpperCase() === _currency.toUpperCase());

  return price ?? defaultValue;
} 

export { default as useTheme } from './useTheme';
