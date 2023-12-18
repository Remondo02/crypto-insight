import { useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import HTMLReactParser from "html-react-parser"
import millify from "millify"
import {
  useGetCryptoDetailsApiQuery,
  useGetCryptoHistoryApiQuery,
} from "../services/cryptoApi.js"
import { getGenericStats, getStats } from "../utils/statsData.jsx"
import {
  AlertMessage,
  Header,
  LineChart,
  Loader,
  SearchSelect,
  CryptoDetailsList,
} from "../components"

export default function CryptoDetails() {
  const { coinId } = useParams()

  const [timePeriod, setTimePeriod] = useState("7d")
  const { data, error, isLoading, isFetching } =
    useGetCryptoDetailsApiQuery(coinId)
  const {
    data: coinHistory,
    error: errorHistory,
    isLoading: isLoadingHistory,
    isFetching: isFetchingHistory,
  } = useGetCryptoHistoryApiQuery({ coinId, timePeriod })

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (error || errorHistory) {
    return <AlertMessage type="error" errors={[error, errorHistory]} />
  }

  const cryptoDetails = data?.data?.coin

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"]

  const stats = getStats(cryptoDetails)
  const genericStats = getGenericStats(cryptoDetails)

  return (
    <Box m={3}>
      <Box>
        <Header
          title={`${cryptoDetails.name}  (${cryptoDetails.symbol})`}
          subtitle={HTMLReactParser(cryptoDetails.description)}
        />
      </Box>

      <Box mb={3}>
        <SearchSelect
          inputLabel="Select Time Period"
          search={timePeriod}
          optionValue={time}
          onSearchChange={setTimePeriod}
        />
      </Box>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <CryptoDetailsList
              title={`${cryptoDetails.name} Value Statistics`}
              subtitle={`An overview showing the stats of ${cryptoDetails.name}`}
              name={cryptoDetails.name}
              stats={stats}
            />

            <CryptoDetailsList
              title="Other Statistics"
              subtitle="An overview showing the stats of all cryptocurrencies"
              name={cryptoDetails.name}
              stats={genericStats}
            />

            <CryptoDetailsList
              title={`${cryptoDetails.name} Links`}
              subtitle={` Various links related to ${cryptoDetails.name}`}
              links={cryptoDetails.links}
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
