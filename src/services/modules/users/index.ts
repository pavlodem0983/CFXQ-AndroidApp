import { api } from '../../api';
import { IUser, IRegisterBody, Transaction, Balance } from 'types/main';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getLoggedInUser: build.query<IUser, string>({
      query: id => `/Investors/${id}`,
    }),
    getLoggedInUserByUsername: build.query<IUser, string>({
      query: username => `/Investors/byname/${username}`,
    }),
    register: build.mutation<any, IRegisterBody>({
      query: data => ({
        url: `/Investors/onboarding`,
        method: 'POST',
        body: data,
      }),
    }),
    sendEmailVerificationCode: build.mutation<any, any>({
      query: userId => ({
        url: `/Investors/${userId}/verify-email/resend-code`,
        method: 'POST',
      }),
    }),
    confirmEmailVerificationCode: build.mutation<any, any>({
      query: params => ({
        url: `/Investors/${params.userId}/verify-email/confirm?code=${params.code}`,
        method: 'POST',
      }),
    }),
    sendPhoneVerificationCode: build.mutation<any, any>({
      query: userId => ({
        url: `/Investors/${userId}/verify-mobile/resend-code`,
        method: 'POST',
      }),
    }),
    confirmPhoneVerificationCode: build.mutation<any, any>({
      query: params => ({
        url: `/Investors/${params.userId}/verify-mobile/confirm?code=${params.code}`,
        method: 'POST',
      }),
    }),
    getBalanceByTokenTypeId: build.query<Balance[], any>({
      query: params => `/Balances/last/${params.userId}`,
    }),
    getTransactionsByTokenId: build.query<
      Transaction[],
      { userId: string; tokenTypeId: string; onlyLastVersion: boolean }
    >({
      query: params => ({
        url: `/Transactions/${params.userId}/${params.tokenTypeId}`,
        params: { onlyLastVersion: true }, // Pass onlyLastVersion as true
      }),
    }),
    getStacksByTokenId: build.query<Transaction[], any>({
      query: params =>
        `/Stacks/interests/${params.userId}/${params.tokenTypeId}`,
    }),
    getWalletsByTokenId: build.query<Transaction[], any>({
      query: params => `/Wallets/${params.userId}/${params.assetId}/addresses`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLoggedInUserQuery,
  useLazyGetLoggedInUserQuery,
  useGetLoggedInUserByUsernameQuery,
  useLazyGetLoggedInUserByUsernameQuery,
  useGetBalanceByTokenTypeIdQuery,
  useLazyGetBalanceByTokenTypeIdQuery,
  useGetTransactionsByTokenIdQuery,
  useLazyGetTransactionsByTokenIdQuery,
  useRegisterMutation,
  useSendEmailVerificationCodeMutation,
  useConfirmEmailVerificationCodeMutation,
  useSendPhoneVerificationCodeMutation,
  useConfirmPhoneVerificationCodeMutation,
} = userApi;
