import { useState } from "react"
import { Box, Grid } from "@mui/material"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { AlertMessage, Header, Loader, CryptoCard, Search } from "../components"

export default function CryptoCurrencies({ simplified }) {
  const count = simplified ? 12 : 100
  const {
    data: cryptosList,
    error,
    isLoading,
    isFetching,
  } = useGetCryptoApiQuery(count)

  const [search, setSearch] = useState("")

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (error) {
    return <AlertMessage type="error" errors={error} />
  }

  const cryptos = cryptosList?.data?.coins

  const visibleItems = cryptos.filter((coin) => {
    if (search && !coin.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    return true
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
      {visibleItems && (
        <Box>
          {!simplified && <Search search={search} onSearchChange={setSearch} />}

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}
            >
              {visibleItems.map((currency, i) => (
                <CryptoCard key={i} currency={currency} />
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
