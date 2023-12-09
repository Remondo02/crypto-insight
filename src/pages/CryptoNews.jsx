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
      <AlertMessage type="error" errorMessage={error}>
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
                // defaultOption={search}
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
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={news.title}>
                  <Link
                    to={news.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        backgroundColor: colors.primary[400],
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={news.urlToImage}
                          alt={news.title}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h4"
                            color={colors.grey[100]}
                          >
                            {news.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {news.description.length > 100
                              ? `${news.description.substring(0, 100)} ...`
                              : news.description}
                          </Typography>
                          <Box
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Typography
                              variant="body2"
                              color={colors.grey[100]}
                            >
                              {news.author}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={colors.grey[100]}
                            >
                              {moment(news.publishedAt).startOf("ss").fromNow()}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
