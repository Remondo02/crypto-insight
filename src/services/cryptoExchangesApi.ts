import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
}

const baseUrl = "https://coingecko.p.rapidapi.com/exchanges"

const createRequest = (url) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchangesApi: builder.query({
      query: () => createRequest(),
    }),
  }),
})

export const { useGetCryptoExchangesApiQuery } = cryptoExchangesApi
