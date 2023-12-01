import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
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

export function Dashboard() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { data, error, isLoading, isFetching } = useGetCryptoApiQuery("coins")

  if (error) {
    return "Error"
  }

  if (isLoading) {
    return "...loading"
  }

  const globalStats = data?.data?.stats

  return (
    <Box m="20px">
      <Box>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(290px, 1fr));"
          // gridAutoRows="140px"
          gap="20px"
        >
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={"Total Cryptocurrencies"}
              value={globalStats.total}
              icon={
                <CurrencyBitcoinIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={"Total Exchanges"}
              value={millify(globalStats.totalExchanges)}
              icon={
                <CurrencyExchangeOutlinedIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={"Total Market Cap"}
              value={millify(globalStats.totalMarketCap)}
              icon={
                <QueryStatsOutlinedIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={"Total 24h Volume"}
              value={millify(globalStats.total24hVolume)}
              icon={
                <UpdateOutlinedIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={"Total Markets"}
              value={millify(globalStats.totalMarkets)}
              icon={
                <PaidOutlinedIcon
                  sx={{ color: colors.grey[100], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
