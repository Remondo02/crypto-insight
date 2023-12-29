import { Box, Typography, useTheme } from "@mui/material"
import { useGetCryptoExchangesApiQuery } from "../services/cryptoExchangesApi.js"
import { AlertMessage, ExchangesAccordion, Header, Loader } from "../components"
import { tokens } from "../theme.js"

export default function Exchanges() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const {
    data: cryptoExchanges,
    error,
    isFetching,
  } = useGetCryptoExchangesApiQuery()

  let errors = []

  if (error) {
    errors = [...errors, error]
  }

  return (
    <Box height="inherit">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EXCHANGES"
          subtitle="List of top 100 exchanges plateformes"
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {errors.length > 0 &&
          errors.map((error, i) => (
            <AlertMessage key={i} type="error" error={error} />
          ))}
      </Box>
      {isFetching && <Loader />}
      {cryptoExchanges && (
        <>
          <Box
            display="flex"
            alignItems="center"
            minHeight={"57px"}
            px={2}
            justifyContent={{ xs: "space-between", md: "unset" }}
            backgroundColor={colors.greenAccent[500]}
          >
            <Box width={{ xs: "initial", md: "calc(50% - 56px)" }}>
              <Typography>Exchanges</Typography>
            </Box>
            <Box width={{ xs: "initial", md: "50%" }}>
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
