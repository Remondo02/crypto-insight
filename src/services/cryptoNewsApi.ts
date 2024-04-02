import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { type NewsApiResponse } from "@/apis";

const cryptoHeaders = {
  "Ocp-Apim-Subscription-Key": import.meta.env.VITE_AZURE_SUBSCRIPTION_KEY,
}

const baseUrl = "https://api.bing.microsoft.com/v7.0/news/search"

const createRequest = (url: string) => ({
  url,
  headers: cryptoHeaders,
})

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNewsApi: builder.query<NewsApiResponse, { newsCategory: string, count: number}>({
      query: ({newsCategory, count}) =>
        createRequest(
          `?q=${
            newsCategory === "Cryptocurrency" ? "" : newsCategory
          } cryptocurrency&mkt=en-US&setLang=en-US&category=Technology&textdecorations=true&textformat=html&freshness=Week&count=${count}&offset=0&sortBy=Date&originalImg=true`
        ),
    }),
  }),
})

export const { useGetCryptoNewsApiQuery } = cryptoNewsApi
