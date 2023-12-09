import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": "coinpaprika1.p.rapidapi.com",
}

const baseUrl = "https://coinpaprika1.p.rapidapi.com/coins"

const createRequest = (url) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoEventsApi = createApi({
  reducerPath: "cryptoEventsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoEventsApi: builder.query({
      query: ({ coinId }) => createRequest(`/${coinId}/events`),
    }),
    getCryptoEventsCoinsApi: builder.query({
      query: () => createRequest(),
    }),
  }),
})

export const { useGetCryptoEventsApiQuery, useGetCryptoEventsCoinsApiQuery } = cryptoEventsApi
