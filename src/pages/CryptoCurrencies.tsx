import { useState } from "react"
import { Box, Grid } from "@mui/material"
import { useGetCryptoApiQuery } from "@/services/cryptoApi"
import { AlertMessage, Header, Loader, CryptoCard, Search } from "@/components"

export default function CryptoCurrencies({
  simplified,
}: {
  simplified?: boolean
}) {
  const count = simplified ? 12 : 100
  const { data, error, isLoading } = useGetCryptoApiQuery(count)

  const [search, setSearch] = useState("")

  const cryptos = data?.data?.coins || []

  const visibleItems = cryptos.filter((coin) => {
    if (search && !coin.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <Box height="inherit">
      {!simplified && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CRYPTO CURRENCIES"
            subtitle="Top 100 cryptocurrencies"
          />
        </Box>
      )}
      {error && <AlertMessage type="error" error={error} />}
      {isLoading && <Loader />}
      {visibleItems && (
        <>
          {!simplified && cryptos.length > 0 && (
            <Search search={search} onSearchChange={setSearch} />
          )}
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
        </>
      )}
    </Box>
  )
}
