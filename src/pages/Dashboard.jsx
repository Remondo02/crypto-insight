import {
  Box,
  useTheme,
} from "@mui/material"
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
import { DescriptionAlerts } from "../components/DescriptionAlerts.jsx"

export function Dashboard() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { data, error, isLoading, isFetching } = useGetCryptoApiQuery(1)

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (error) {
    return <DescriptionAlerts type="error" error={error} />
  }

  const globalStats = data?.data?.stats

  return (
    <Box m={3}>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box mb={7}>
        <SectionHeader title="Global Crypto Stats" />
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(290px, 1fr));"
          gap={3}
        >
          <StatBox
            title={"Total Cryptocurrencies"}
            value={globalStats.total}
            icon={
              <CurrencyBitcoinIcon
                sx={{ color: colors.grey[100], fontSize: 26 }}
              />
            }
          />
          <StatBox
            title={"Total Exchanges"}
            value={millify(globalStats.totalExchanges)}
            icon={
              <CurrencyExchangeOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: 26 }}
              />
            }
          />
          <StatBox
            title={"Total Market Cap"}
            value={millify(globalStats.totalMarketCap)}
            icon={
              <QueryStatsOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: 26 }}
              />
            }
          />
          <StatBox
            title={"Total 24h Volume"}
            value={millify(globalStats.total24hVolume)}
            icon={
              <UpdateOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: 26 }}
              />
            }
          />
          <StatBox
            title={"Total Markets"}
            value={millify(globalStats.totalMarkets)}
            icon={
              <PaidOutlinedIcon
                sx={{ color: colors.grey[100], fontSize: 26 }}
              />
            }
          />
        </Box>
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
