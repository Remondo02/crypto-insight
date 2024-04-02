import { useState } from "react"
import { Box, Grid } from "@mui/material"
import { useGetCryptoApiQuery } from "@/services/cryptoApi"
import { useGetCryptoNewsApiQuery } from "@/services/cryptoNewsApi"
import {
  AlertMessage,
  Header,
  Loader,
  NewsCard,
  SearchSelect,
} from "@/components"

export default function CryptoNews({ simplified }: { simplified?: boolean }) {
  const count = simplified ? 8 : 100
  const {
    data: cryptos,
    // isError: isErrorCrypto,
    // error: errorCrypto,
    // isLoading: isLoadingCrypto,
    // isSuccess: isSuccessCrypto,
  } = useGetCryptoApiQuery(100)

  const [search, setSearch] = useState("Cryptocurrency")

  const {
    data: cryptoNews,
    // isError: isErrorNews,
    // error: errorNews,
    isLoading: isLoadingNews,
    isFetching: isFetchingNews,
    isSuccess: isSuccessNews,
  } = useGetCryptoNewsApiQuery({
    newsCategory: search,
    count: count,
  })

  // let errors = []

  // if (errorCrypto) {
  //   errors = [...errors, errorCrypto]
  // }
  // if (errorNews) {
  //   errors = [...errors, errorNews]
  // }

  const coins = cryptos?.data?.coins || []

  const coinsWithInitialValue = JSON.parse(JSON.stringify(coins))
  coinsWithInitialValue.unshift({
    uuid: "",
    symbol: "",
    name: "Cryptocurrency",
  })

  return (
    <Box height="inherit">
      {!simplified && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CRYPTO NEWS"
            subtitle="Latest news related to cryptocurrencies"
          />
        </Box>
      )}
      {/* {isErrorCrypto ||
        (isErrorNews && (
          <Box display="flex" flexDirection="column" gap={2}>
            {errors.map((error, i) => (
              <AlertMessage key={i} type="error" error={error} />
            ))}
          </Box>
        ))} */}
      {isLoadingNews && <Loader />}
      {isSuccessNews && (
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
                    {cryptoNews.value.map((news) => (
                      <NewsCard
                        simplified={simplified}
                        key={news.name}
                        title={news.name}
                        url={news.url}
                        image={news.image}
                        description={news.description}
                        provider={news.provider}
                        datePublished={news.datePublished}
                      />
                    ))}
                  </Grid>
                </Box>
              ) : (
                <AlertMessage
                  type="info"
                  error={`No news available for ${cryptoNews.queryContext.originalQuery}.`}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
