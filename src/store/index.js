import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notification-slice";
import productReducer from "./product-slice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    product: productReducer
  }
});

export default store;
