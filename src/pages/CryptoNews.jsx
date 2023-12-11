import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  useTheme,
} from "@mui/material"
import { Header } from "../components/Header.jsx"
import { useGetCryptoNewsApiQuery } from "../services/cryptoNewsApi.js"
import { Link } from "react-router-dom"
import { tokens } from "../theme.js"
import moment from "moment"
import { AlertMessage } from "../components/AlertMessage.jsx"
import { Loader } from "../components/Loader.jsx"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { useState } from "react"
import { SearchSelect } from "../components/SearchSelect.jsx"
import { NewsCard } from "../components/NewsCard.jsx"

export function CryptoNews({ simplified }) {
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
    const error = { ...errorNews, ...errorCrypto }
    return (
      <AlertMessage type="error">
        {error?.data?.message?.toString()}
      </AlertMessage>
    )
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
            subtitle="All informations related to currencies"
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
              {cryptoNews.articles.map((news) => (
                <NewsCard
                  key={news.title}
                  title={news.title}
                  url={news.url}
                  urlToImage={news.urlToImage}
                  description={news.description}
                  author={news.author}
                  publishedAt={news.publishedAt}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
