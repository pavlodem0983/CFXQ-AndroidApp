import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@services/modules/users';
import { appApi } from '@services/modules/app';
import { IUser, TokenPlatform, TokenType, Country } from 'types/main';
import axios from 'axios';
import { decode } from 'base-64';
import { IRegisterBody } from 'types/main';

const AUTH_URL = process.env.AWS_AUTH_URL;
const AUTH_CLIENT_ID = process.env.AWS_AUTH_CLIENT_ID;

type AuthStateType = {
  AccessToken: string | null;
  IdToken: string | null;
  user: IUser | null;
  countries: Country[];
  tokenPlatforms: TokenPlatform[];
  tokenTypes: TokenType[];
  loading: boolean;
};

type LoginParams = {
  email: string;
  password: string;
};

export const loginByEmailPassword = createAsyncThunk(
  'auth/loginByEmailPassword',
  async (
    { email, password }: LoginParams,
    { getState, dispatch, rejectWithValue },
  ) => {
    const headers = {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    };
    try {
      const authData = {
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: AUTH_CLIENT_ID,
      };
      const authResult = await axios.post(`${AUTH_URL}`, authData, { headers });
      const { AccessToken, IdToken } = authResult.data.AuthenticationResult;
      dispatch(setAuth(authResult.data.AuthenticationResult));
      const decodedString = decode(IdToken.split('.')[1]);
      const decodedObject = JSON.parse(decodedString);
      const username = decodedObject['cognito:username'];
      const { status, data, error } = await dispatch(
        userApi.endpoints.getLoggedInUserByUsername.initiate(username),
      );
      const { data: countyData } = await dispatch(
        appApi.endpoints.getCountries.initiate(),
      );
      const { data: tokenPlatformsData } = await dispatch(
        appApi.endpoints.getTokenPlatforms.initiate(),
      );
      const { data: tokenTypesData } = await dispatch(
        appApi.endpoints.getTokenTypes.initiate(),
      );

      if (!data || error) {
        // error handler
        dispatch(logout());
        return rejectWithValue('UserNotFound');
      } else {
        return {
          authTokens: {
            AccessToken,
            IdToken,
          },
          user: data,
          countries: countyData ?? [],
          tokenPlatforms: tokenPlatformsData ?? [],
          tokenTypes: tokenTypesData ?? [],
        };
      }
    } catch (error: any) {
      dispatch(logout());
      const { __type, message } = error.response.data;
      // _type: UserNotConfirmedException
      if (__type === 'UserNotConfirmedException') {
        console.log(message);
      } else if (__type === 'NotAuthorizedException') {
        console.log(message);
      } else {
        console.log('Something else ');
      }
      return rejectWithValue(__type);
    }
  },
);

export const registerWithEmailPassword = createAsyncThunk(
  'auth/registerWithEmailPassword',
  async (params: IRegisterBody, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        userApi.endpoints.register.initiate(params),
      );

      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const slice = createSlice({
  name: 'app',
  initialState: {
    AccessToken: null,
    IdToken: null,
    user: null,
    countries: [],
    tokenPlatforms: [],
    tokenTypes: [],
    loading: false,
  } as AuthStateType,
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        AccessToken: action.payload.AccessToken,
        IdToken: action.payload.IdToken,
      };
    },
    setAppData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: state => {
      return {
        AccessToken: null,
        IdToken: null,
        user: null,
        countries: [],
        tokenPlatforms: [],
        tokenTypes: [],
        loading: false,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loginByEmailPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginByEmailPassword.fulfilled, (state, action) => {
      state.loading = false;
      const { authTokens, user, countries, tokenPlatforms, tokenTypes } =
        action.payload;
      state.AccessToken = authTokens.AccessToken;
      state.IdToken = authTokens.IdToken;
      state.user = user;
      state.countries = countries;
      state.tokenPlatforms = tokenPlatforms;
      state.tokenTypes = tokenTypes;
    });
    builder.addCase(loginByEmailPassword.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerWithEmailPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerWithEmailPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(registerWithEmailPassword.rejected, state => {
      state.loading = false;
    });
    builder.addMatcher(
      userApi.endpoints.getLoggedInUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      },
    );
  },
});

export const { setAuth, setAppData, logout } = slice.actions;

export default slice.reducer;
