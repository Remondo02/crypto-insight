import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
}

const baseUrl = "https://coinranking1.p.rapidapi.com"

const createRequest = (url: string) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoApi: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetailsApi: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistoryApi: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/?timePeriod=${timePeriod}`),
    }),
  }),
})

export const { useGetCryptoApiQuery, useGetCryptoDetailsApiQuery, useGetCryptoHistoryApiQuery } = cryptoApi
