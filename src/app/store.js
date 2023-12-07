import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { cryptoApi } from "./../services/cryptoApi.js"
import { cryptoNewsApi } from "./../services/cryptoNewsApi.js"
import { cryptoEventsApi } from "../services/cryptoEventsApi.js"
import { cryptoExchangesApi } from "../services/cryptoExchangesApi.js"

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoEventsApi.reducerPath]: cryptoEventsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(cryptoEventsApi.middleware)
      .concat(cryptoExchangesApi.middleware),
})

setupListeners(store.dispatch)
