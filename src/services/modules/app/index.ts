import { api } from '../../api';
import { Country, TokenPlatform, TokenType } from 'types/main';

export const appApi = api.injectEndpoints({
  endpoints: build => ({
    getCountries: build.query<Country[], void>({
      query: () => `/countries`
    }),
    getTokenPlatforms: build.query<TokenPlatform[], void>({
      query: () => `/TokenPlatforms`
    }),
    getTokenTypes: build.query<TokenType[], void>({
      query: () => `/TokenTypes`
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
  useGetTokenPlatformsQuery,
  useLazyGetTokenPlatformsQuery,
  useGetTokenTypesQuery,
  useLazyGetTokenTypesQuery
} = appApi;
 