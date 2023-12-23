import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoHeaders = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_AZURE_SUBSCRIPTION_KEY,
}

const baseUrl = "https://api.bing.microsoft.com/v7.0/news/search"

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
          `?q=${newsCategory}&mkt=en-US&setLang=en-US&textdecorations=true&textformat=html&freshness=Day&count=${count}&offset=0&sortBy=Date&originalImg=true`
        ),
    }),
  }),
})

export const { useGetCryptoNewsApiQuery } = cryptoNewsApi
