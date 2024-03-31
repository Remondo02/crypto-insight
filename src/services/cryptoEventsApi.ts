import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { IEventsApiResponse, IEventCoinsApiResponse } from "@/apis";

const cryptoHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": "coinpaprika1.p.rapidapi.com",
}

const baseUrl = "https://coinpaprika1.p.rapidapi.com/coins"

const createRequest = (url: string) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoEventsApi = createApi({
  reducerPath: "cryptoEventsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoEventsApi: builder.query<IEventsApiResponse, {coinId: string}>({
      query: ({ coinId }) => createRequest(`/${coinId}/events`),
    }),
    getCryptoEventsCoinsApi: builder.query<IEventCoinsApiResponse, string>({
      query: () => createRequest(baseUrl),
    }),
  }),
})

export const { useGetCryptoEventsApiQuery, useGetCryptoEventsCoinsApiQuery } = cryptoEventsApi
