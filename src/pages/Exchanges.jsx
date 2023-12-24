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
    isFetching,
  } = useGetCryptoExchangesApiQuery()

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EXCHANGES"
          subtitle="List of top 100 exchanges plateformes"
        />
      </Box>
      {isFetching && <Loader />}
      {error && <AlertMessage type="error" errors={error} />}
      {cryptoExchanges && (
        <>
          <Box
            display="flex"
            alignItems="center"
            minHeight={"57px"}
            px={2}
            justifyContent={isMobile ? "space-between" : ""}
            backgroundColor={colors.greenAccent[500]}
          >
            <Box width={isMobile ? "initial" : "calc(50% - 56px)"}>
              <Typography>Exchanges</Typography>
            </Box>
            <Box width={!isMobile ? "50%" : "initial"}>
              <Typography>24h Trade Volume</Typography>
            </Box>
          </Box>
          {cryptoExchanges.map((exchange) => (
            <ExchangesAccordion key={exchange.id} exchange={exchange} />
          ))}
        </>
      )}
    </Box>
  )
}
