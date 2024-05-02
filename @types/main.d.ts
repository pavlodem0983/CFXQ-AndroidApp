export type IUser = {
  id: number;
  zohoIdentifier: number;
  email: string;
  mobile: string | null;
  awsUserId: string;
  firstName: string;
  lastName: string;
  birthData: string;
  city: string | null;
  country: Country;
  countryId: number | null;
  fireblocksVaultId: number | null;
  kycStatus: string | null;
  postalCode: string | null;
  preferredCurrency: string | null;
  stackingPledges: StackingPledge[];
  state: string | null;
  status: number;
  streetAddress1: string | null;
  streetAddress2: string | null;
  termsConditions: boolean;
  termsConditionsList: TermsCondition[];
  termsConditionsZone: boolean;
  tokenBalances: Balance[];
  transactions: Transaction[];
  compounds: Compund[];
};

export type IRegisterBody = {
  email: string;
  password: string;
  mobile: string;
  birthDate: string;
  givenName: string;
  familyName: string;
};

export type TokenPlatform = {
  id: number;
  shortName: string;
};

export type TokenPrice = {
  token: number;
  currencyTo: string;
  unitValue: number;
  timestamp: string;
};

export type TokenType = {
  id: number;
  shortName: string;
  fullName: string;
  tokenPrices: TokenPrice[];
};

export type Country = {
  countryIso2: string;
  countryIso3: string;
  countryName: string;
};

export type Transaction = {
  id: number;
  investorId: number;
  tokenTypeId: number;
  status: number;
  tradeTms: string;
  releaseDate: string;
  settlementTms: string;
  tradeType: number;
  paymentDate: string;
  salesbackDate: string;
  paymentAsset: string;
  quantity: number;
  price: number;
  fees: number;
  totInvoice: number;
  switchType: number;
  platformKey: number;
  platformId: number;
  syncHandled: boolean;
  investor: IUser;
  tokenType: TokenType;
  platform: TokenPlatform;
};

export type Balance = {
  id: number;
  tokenTypeId: number;
  investorId: number;
  tms: string;
  changeType: number;
  changeAmount: number;
  principal: number;
  interests: number;
  calculationPeriod: string;
  syncHandled: boolean;
  totalPrincipal: number;
  totalInterests: number;
  investor: IUser;
  tokenType: TokenType;
  total: number;
};

export type Compund = {
  id: number;
  investerId: number;
  compounding: boolean;
  tms: string;
  invester: string;
};

export type StackingPledge = {
  id: number;
  tokenTypeId: number;
  investorId: number;
  tms: string;
  operationType: number;
  amount: number;
  operationStatus: number;
  investor: string;
  tokenType: TokenType;
};

export type TermsCondition = {
  id: number;
  investerId: number;
  termsType: 0;
  termsVersion: number;
  tms: string;
  termsSignature: boolean;
};
