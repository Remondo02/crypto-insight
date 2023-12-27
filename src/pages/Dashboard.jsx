import { Box, useTheme } from "@mui/material"
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined"
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined"
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined"
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import millify from "millify"
import { tokens } from "../theme.js"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { CryptoCurrencies, CryptoNews } from "../pages"
import {
  AlertMessage,
  Header,
  GlobalStatCard,
  Loader,
  SectionHeader,
} from "../components"

export default function Dashboard() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { data, error, isFetching } = useGetCryptoApiQuery(1)

  const styles = { color: colors.grey[100], fontSize: 26 }

  const globalStats = data?.data?.stats

  function stats({ globalStats }) {
    return [
      {
        title: "Total Cryptocurrencies",
        value: globalStats?.total,
        icon: <CurrencyBitcoinIcon style={styles} />,
      },
      {
        title: "Total Exchanges",
        value: millify(globalStats?.totalExchanges),
        icon: <CurrencyExchangeOutlinedIcon style={styles} />,
      },
      {
        title: "Total Market Cap",
        value: millify(globalStats?.totalMarketCap),
        icon: <QueryStatsOutlinedIcon style={styles} />,
      },
      {
        title: "Total 24h Volume",
        value: millify(globalStats?.total24hVolume),
        icon: <UpdateOutlinedIcon style={styles} />,
      },
      {
        title: "Total Markets",
        value: millify(globalStats?.totalMarkets),
        icon: <PaidOutlinedIcon style={styles} />,
      },
    ]
  }

  return (
    <Box>
      <Header
        title="DASHBOARD"
        subtitle="Get general informations about cryptocurrencies"
      />
      <Box mb={7}>
        <SectionHeader title="Global Crypto Stats" />
        {error && <AlertMessage type="error" errors={error} />}
        {isFetching && <Loader />}
        {globalStats && (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(330px, 1fr));"
            gap={3}
          >
            {stats({ globalStats }).map(({ title, value, icon }) => (
              <GlobalStatCard
                key={title}
                title={title}
                value={value}
                icon={icon}
              />
            ))}
          </Box>
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
