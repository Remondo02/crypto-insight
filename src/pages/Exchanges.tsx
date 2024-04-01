import { Box, Typography, useTheme } from "@mui/material"
import { useGetCryptoExchangesApiQuery } from "../services/cryptoExchangesApi.js"
import { AlertMessage, ExchangesAccordion, Header, Loader } from "@/components"
import { tokens } from "@/theme"

export default function Exchanges() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { data, isError, error, isLoading, isSuccess } =
    useGetCryptoExchangesApiQuery()

  return (
    <Box height="inherit">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EXCHANGES"
          subtitle="List of top 100 exchanges plateformes"
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* {isError && <AlertMessage type="error" error={error} />} */}
      </Box>
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <Box
            display="flex"
            alignItems="center"
            minHeight={"57px"}
            px={2}
            justifyContent={{ xs: "space-between", md: "unset" }}
            sx={{ backgroundColor: colors.greenAccent[500] }}
          >
            <Box width={{ xs: "initial", md: "calc(50% - 56px)" }}>
              <Typography>Exchanges</Typography>
            </Box>
            <Box width={{ xs: "initial", md: "50%" }}>
              <Typography>24h Trade Volume</Typography>
            </Box>
          </Box>
          {data.map((exchange) => (
            <ExchangesAccordion key={exchange.id} exchange={exchange} />
          ))}
        </>
      )}
    </Box>
  )
}
