import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoHeaders = {
  "X-Api-Key": import.meta.env.VITE_CRYPTO_NEWS_API_KEY,
}

const baseUrl = "https://newsapi.org/v2/"

const createRequest = (url) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNewsApi: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `everything?domains=coindesk.com,u.today,decrypt.co&q=${newsCategory}&sortBy=publishedAt&pageSize=${count}`
        ),
    }),
  }),
})

export const { useGetCryptoNewsApiQuery } = cryptoNewsApi
