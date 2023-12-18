import { Box, Typography, useTheme } from "@mui/material"
import { useGetCryptoExchangesApiQuery } from "../services/cryptoExchangesApi.js"
import { AlertMessage, ExchangesAccordion, Header, Loader } from "../components"
import { tokens } from "../theme.js"
import { useMediaQuery } from "../hooks/useMediaQuery.js"

export default function Exchanges() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isMobile = useMediaQuery()
  const {
    data: cryptoExchanges,
    error,
    isLoading,
  } = useGetCryptoExchangesApiQuery()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <AlertMessage type="error" errors={error} />
  }

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EXCHANGES"
          subtitle="List of top 100 exchanges plateformes"
        />
      </Box>
      <Box
        display="flex"
        pl={2}
        py={2}
        backgroundColor={colors.greenAccent[500]}
      >
        <Box width={isMobile ? "100%" : "calc(50% - 56px)"}>
          <Typography>Exchanges</Typography>
        </Box>
        <Box width="50%">
          <Typography>24h Trade Volume</Typography>
        </Box>
      </Box>
      {cryptoExchanges &&
        cryptoExchanges.map((exchange) => (
          <ExchangesAccordion key={exchange.id} exchange={exchange} />
        ))}
    </Box>
  )
}
