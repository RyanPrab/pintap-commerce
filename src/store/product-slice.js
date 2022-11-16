import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastSeenProduct: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLastSeen(state, action) {
      state.lastSeenProduct = action.payload
    }
  }
});

export const productAction = productSlice.actions;

export default productSlice.reducer;
