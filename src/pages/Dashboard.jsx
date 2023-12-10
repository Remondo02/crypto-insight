import { Box, Grid, useTheme } from "@mui/material"
import { Header } from "../components/Header.jsx"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { tokens } from "../theme.js"
import millify from "millify"
import { StatBox } from "../components/StatBox.jsx"
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin"
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined"
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined"
import { SectionHeader } from "../components/SectionHeader.jsx"
import { Loader } from "../components/Loader.jsx"

import { CryptoCurrencies } from "./CryptoCurrencies.jsx"
import { CryptoNews } from "./CryptoNews.jsx"
import { AlertMessage } from "../components/AlertMessage.jsx"

export function Dashboard() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { data, error, isLoading, isFetching } = useGetCryptoApiQuery(1)

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (error) {
    return (
      <AlertMessage type="error">
        {error?.data?.message?.toString()}
      </AlertMessage>
    )
  }

  const globalStats = data?.data?.stats

  const styles = { color: colors.grey[100], fontSize: 26 }

  return (
    <Box m={3}>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box mb={7}>
        <SectionHeader title="Global Crypto Stats" />
        {globalStats && (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12, xl: 15 }}
          >
            <StatBox
              title={"Total Cryptocurrencies"}
              value={globalStats.total}
              icon={<CurrencyBitcoinIcon style={styles} />}
            />

            <StatBox
              title={"Total Exchanges"}
              value={millify(globalStats.totalExchanges)}
              icon={<CurrencyExchangeOutlinedIcon style={styles} />}
            />

            <StatBox
              title={"Total Market Cap"}
              value={millify(globalStats.totalMarketCap)}
              icon={<QueryStatsOutlinedIcon style={styles} />}
            />

            <StatBox
              title={"Total 24h Volume"}
              value={millify(globalStats.total24hVolume)}
              icon={<UpdateOutlinedIcon style={styles} />}
            />

            <StatBox
              title={"Total Markets"}
              value={millify(globalStats.totalMarkets)}
              icon={<PaidOutlinedIcon style={styles} />}
            />
          </Grid>
        )}
      </Box>
      <Box mb={7}>
        <SectionHeader
          title="Top 10 Cryptocurrencies in the world"
          to="/cryptocurrencies"
          buttonLabel="Show More"
        />
        <CryptoCurrencies simplified />
      </Box>
      <Box mb={7}>
        <SectionHeader
          title="Latest Crypto News"
          to="/news"
          buttonLabel="Show More"
        />
        <CryptoNews simplified />
      </Box>
    </Box>
  )
}
