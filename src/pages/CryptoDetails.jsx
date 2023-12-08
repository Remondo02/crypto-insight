import { Box, Grid } from "@mui/material"
import { Header } from "../components/Header.jsx"
import HTMLReactParser from "html-react-parser"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useGetCryptoDetailsApiQuery } from "../services/cryptoApi.js"

import { getGenericStats, getStats } from "../utils/singleUtils.jsx"

import { SearchSelect } from "../components/SearchSelect.jsx"
import { SingleList } from "../components/SingleList.jsx"

export function CryptoDetails() {
  const { coinId } = useParams()

  const [timePeriod, setTimePeriod] = useState("7d")
  const { data, error, isLoading, isFetching } =
    useGetCryptoDetailsApiQuery(coinId)

  if (isLoading || isFetching) {
    return "...loading"
  }

  if (error) {
    return <DescriptionAlerts type="error" error={error}></DescriptionAlerts>
  }

  const cryptoDetails = data?.data?.coin

  const time = ["24h", "7d", "30d"]

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
      {/* Line Charts */}
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <SingleList
              title={`${cryptoDetails.name} Value Statistics`}
              subtitle={`An overview showing the stats of ${cryptoDetails.name}`}
              name={cryptoDetails.name}
              stats={stats}
            />

            <SingleList
              title="Other Statistics"
              subtitle="An overview showing the stats of all cryptocurrencies"
              name={cryptoDetails.name}
              genericStats={genericStats}
            />

            <SingleList
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
