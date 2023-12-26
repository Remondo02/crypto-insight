import { useState } from "react"
import { Box, Grid } from "@mui/material"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { useGetCryptoNewsApiQuery } from "../services/cryptoNewsApi.js"
import {
  AlertMessage,
  Header,
  Loader,
  NewsCard,
  SearchSelect,
} from "../components"

export default function CryptoNews({ simplified }) {
  const count = simplified ? 8 : 100
  const {
    data: cryptos,
    error: errorCrypto,
    isLoading: isLoadingCrypto,
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

  const coins = cryptos?.data?.coins || []

  const coinsWithInitialValue = JSON.parse(JSON.stringify(coins))
  coinsWithInitialValue.unshift({
    uuid: "",
    symbol: "",
    name: "Cryptocurrency",
  })

  return (
    <Box marginInline={simplified ? "" : 3} paddingBottom={7} height="inherit">
      {!simplified && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CRYPTO CURRENCIES"
            subtitle="Latest news related to cryptocurrencies"
          />
        </Box>
      )}
      {errorNews ||
        (errorCrypto && (
          <AlertMessage type="error" errors={[errorNews, errorCrypto]} />
        ))}
      {isLoadingCrypto || isLoadingNews ? (
        <Loader />
      ) : (
        cryptoNews && (
          <Box height={isFetchingNews ? "inherit" : ""}>
            {!simplified && (
              <Box mb={3}>
                <SearchSelect
                  inputLabel="Select a Crypto"
                  search={search}
                  optionValue={coinsWithInitialValue}
                  onSearchChange={setSearch}
                />
              </Box>
            )}
            {isFetchingNews ? (
              <Loader />
            ) : (
              <>
                {cryptoNews.value.length > 0 ? (
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}
                    >
                      {cryptoNews.value.map(
                        ({
                          name,
                          url,
                          image,
                          description,
                          provider,
                          datePublished,
                        }) => (
                          <NewsCard
                            simplified={simplified}
                            key={name}
                            title={name}
                            url={url}
                            image={image}
                            description={description}
                            provider={provider}
                            datePublished={datePublished}
                          />
                        )
                      )}
                    </Grid>
                  </Box>
                ) : (
                  <AlertMessage
                    type="info"
                    errors={`No news available for ${cryptoNews.queryContext.originalQuery}.`}
                  />
                )}
              </>
            )}
          </Box>
        )
      )}
    </Box>
  )
}
