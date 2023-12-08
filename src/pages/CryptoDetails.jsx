import {
  Box,
  Typography,
  useTheme,
  Grid,
  Divider,
  Avatar,
  Link,
} from "@mui/material"
import { Header } from "../components/Header.jsx"
import HTMLReactParser from "html-react-parser"
import { useParams } from "react-router-dom"
import millify from "millify"
import { useState } from "react"
import { useGetCryptoDetailsApiQuery } from "../services/cryptoApi.js"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined"
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined"
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined"
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined"
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined"

import { tokens } from "../theme.js"
import { SearchSelect } from "../components/SearchSelect.jsx"

export function CryptoDetails() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
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

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <AttachMoneyOutlinedIcon />,
    },
    {
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <ThumbUpOutlinedIcon />,
    },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <BoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <EmojiEventsOutlinedIcon />,
    },
  ]

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <CurrencyExchangeOutlinedIcon />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <InventoryOutlinedIcon />
      ) : (
        <StopCircleOutlinedIcon />
      ),
      icon: <InfoOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <InfoOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <InfoOutlinedIcon />,
    },
  ]

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
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 4, md: 8, lg: 12 }}
          >
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Box>
                <Box marginBottom={2}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                    color={colors.greenAccent[500]}
                    mb={1}
                  >
                    {cryptoDetails.name} Value Statistics
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    An overview showing the stats of {cryptoDetails.name}
                  </Typography>
                </Box>
                <Box backgroundColor={colors.primary[400]}>
                  {stats.map(({ icon, title, value }) => (
                    <Box key={title}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                      >
                        <Box display="flex" alignItems="inherit">
                          <Avatar
                            sx={{ bgcolor: colors.greenAccent[400], mr: 2 }}
                          >
                            {icon}
                          </Avatar>
                          <Typography variant="body1" color={colors.grey[100]}>
                            {title}
                          </Typography>
                        </Box>
                        <Typography
                          component="div"
                          fontWeight="bold"
                          sx={{ color: colors.grey[100] }}
                        >
                          {value}
                        </Typography>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Box>
                <Box marginBottom={2}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                    color={colors.greenAccent[500]}
                    mb={1}
                  >
                    Other Statistics
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    An overview showing the stats of all cryptocurrencies
                  </Typography>
                </Box>
                <Box backgroundColor={colors.primary[400]}>
                  {genericStats.map(({ icon, title, value }) => (
                    <Box key={title}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                      >
                        <Box display="flex" alignItems="inherit">
                          <Avatar
                            sx={{ bgcolor: colors.greenAccent[400], mr: 2 }}
                          >
                            {icon}
                          </Avatar>
                          <Typography variant="body1" color={colors.grey[100]}>
                            {title}
                          </Typography>
                        </Box>
                        <Typography
                          component="div"
                          fontWeight="bold"
                          sx={{ color: colors.grey[100] }}
                        >
                          {value}
                        </Typography>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            {/* <Grid item xs={4} sm={4} md={4}>
              <Box>
                <Box marginBottom={2}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                    color={colors.greenAccent[500]}
                    mb={1}
                  >
                    What is {cryptoDetails.name}
                  </Typography>
                  <Typography variant="body1" color={colors.grey[100]}>
                    {HTMLReactParser(cryptoDetails.description)}
                  </Typography>
                </Box>
              </Box>
            </Grid> */}
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Box>
                <Box marginBottom={2}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                    color={colors.greenAccent[500]}
                    mb={1}
                  >
                    {cryptoDetails.name} Links
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Various links related to {cryptoDetails.name}
                  </Typography>
                </Box>
                <Box backgroundColor={colors.primary[400]}>
                  {cryptoDetails.links.map(({ name, url }) => (
                    <Box key={name}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={2}
                      >
                        <Typography variant="body1" color={colors.grey[100]}>
                          {name}
                        </Typography>
                        <Link
                          href={url}
                          underline="none"
                          target="_blank"
                          rel="noreferrer"
                          sx={{
                            color: "#6870fa",
                            textDecoration: "none",
                            "&:hover": {
                              color: "#868dfb !important",
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          {url}
                        </Link>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
