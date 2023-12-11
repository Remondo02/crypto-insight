import { Box, Grid, useTheme } from "@mui/material"
import { Header } from "../components/Header.jsx"
import { useGetCryptoApiQuery } from "../services/cryptoApi.js"
import { tokens } from "../theme.js"
import { GlobalStatCard } from "../components/GlobalStatCard.jsx"
import { SectionHeader } from "../components/SectionHeader.jsx"
import { Loader } from "../components/Loader.jsx"
import { CryptoCurrencies } from "./CryptoCurrencies.jsx"
import { CryptoNews } from "./CryptoNews.jsx"
import { AlertMessage } from "../components/AlertMessage.jsx"
import { getGlobalStats } from "../utils/statsData.jsx"

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
