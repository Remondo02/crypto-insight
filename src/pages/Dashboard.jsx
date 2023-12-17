import { Box, useTheme } from "@mui/material"
import { tokens } from "../theme.js"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import CryptoCurrencies from "./CryptoCurrencies.jsx"
import CryptoNews from "./CryptoNews.jsx"
import { getGlobalStats } from "../utils/statsData.jsx"
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
  const { data, error, isLoading, isFetching } = useGetCryptoApiQuery(1)

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (error) {
    return <AlertMessage type="error" errors={error} />
  }

  const globalStats = data?.data?.stats
  const stats = getGlobalStats(globalStats, colors)

  return (
    <Box m={3}>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box mb={7}>
        <SectionHeader title="Global Crypto Stats" />
        {globalStats && (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(290px, 1fr));"
            gap={3}
          >
            {stats.map(({ title, value, icon }) => (
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
