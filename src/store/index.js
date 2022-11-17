import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notification-slice";
import productReducer from "./product-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    product: productReducer,
    cart: cartReducer
  }
});

export default store;
