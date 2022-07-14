
import { configureStore } from "@reduxjs/toolkit";

import textboxSlice from "./textboxStore";

const Store=configureStore({
    reducer:textboxSlice.reducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default Store;