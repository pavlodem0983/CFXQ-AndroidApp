import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingStateType = {
  showTotalPrice: boolean;
  langChange: string;
};

const initialState: SettingStateType = {
  showTotalPrice: true,
  langChange: 'en',
};

const slice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    toggleShowTotalPrice: state => {
      return {
        ...state,
        showTotalPrice: !state.showTotalPrice,
      };
    },
    dispatchIsDonor(state, action) {
      state.langChange = action.payload;
    },
  },
});

export const { toggleShowTotalPrice, dispatchIsDonor } = slice.actions;

export default slice.reducer;
