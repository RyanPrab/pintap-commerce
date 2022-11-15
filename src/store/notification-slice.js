import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  status: null,
  title: null,
  message: null
};

const notificationSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    notification(state, action) {
      state.isShown = !state.isShown;
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.message = action.payload.message
    }
  }
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice.reducer;
