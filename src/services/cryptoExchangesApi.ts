import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { type ExchangesApiResponse } from "@/apis";

const cryptoHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
}

const baseUrl = "https://coingecko.p.rapidapi.com/exchanges"

const createRequest = (url: string) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchangesApi: builder.query<ExchangesApiResponse[], void>({
      query: () => createRequest(baseUrl),
    }),
  }),
})

export const { useGetCryptoExchangesApiQuery } = cryptoExchangesApi
