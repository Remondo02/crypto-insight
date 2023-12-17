import { useState } from "react"
import { Box, Grid, useTheme } from "@mui/material"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { useGetCryptoNewsApiQuery } from "../services/cryptoNewsApi.js"
import { tokens } from "../theme.js"
import {
  AlertMessage,
  Header,
  Loader,
  NewsCard,
  SearchSelect,
} from "../components"

export default function CryptoNews({ simplified }) {
  const count = simplified ? 8 : 100
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const {
    data: cryptos,
    error: errorCrypto,
    isLoading: isLoadingCrypto,
    isFetching: isFetchingCrypto,
  } = useGetCryptoApiQuery(100)

  const [search, setSearch] = useState("Cryptocurrency")

  const {
    data: cryptoNews,
    error: errorNews,
    isLoading: isLoadingNews,
    isFetching: isFetchingNews,
  } = useGetCryptoNewsApiQuery({
    newsCategory: search,
    count: count,
  })

  if (isFetchingNews || isFetchingCrypto) {
    return <Loader />
  }

  if (errorNews || errorCrypto) {
    return <AlertMessage type="error" errors={[errorNews, errorCrypto]} />
  }

  const coins = cryptos?.data?.coins

  const coinsWithInitialValue = JSON.parse(JSON.stringify(coins))
  coinsWithInitialValue.unshift({
    uuid: "",
    symbol: "",
    name: "Cryptocurrency",
  })

  return (
    <Box sx={!simplified ? { margin: 3 } : {}}>
      {!simplified && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CRYPTO CURRENCIES"
            subtitle="Latest news related to cryptocurrencies"
          />
        </Box>
      )}
      {cryptoNews && (
        <Box>
          {!simplified && (
            <Box mb={3}>
              <SearchSelect
                search={search}
                optionValue={coinsWithInitialValue}
                onSearchChange={setSearch}
              />
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}
            >
              {cryptoNews.articles.map(
                ({
                  title,
                  url,
                  urlToImage,
                  description,
                  author,
                  publishedAt,
                }) => (
                  <NewsCard
                    key={title}
                    title={title}
                    url={url}
                    urlToImage={urlToImage}
                    description={description}
                    author={author}
                    publishedAt={publishedAt}
                  />
                )
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
