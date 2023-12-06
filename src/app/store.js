import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { cryptoApi } from "./../services/cryptoApi.js"
import { cryptoNewsApi } from "./../services/cryptoNewsApi.js"
import { cryptoEventsApi } from "../services/cryptoEventsApi.js"

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoEventsApi.reducerPath]: cryptoEventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(cryptoEventsApi.middleware),
})

setupListeners(store.dispatch)
