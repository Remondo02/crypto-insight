import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { cryptoApi } from "./../services/cryptoApi"
import { cryptoNewsApi } from "./../services/cryptoNewsApi"
import { cryptoEventsApi } from "./../services/cryptoEventsApi"
import { cryptoExchangesApi } from "./../services/cryptoExchangesApi"

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
