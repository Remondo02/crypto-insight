import { useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Grid } from "@mui/material"
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
import HTMLReactParser from "html-react-parser"
import millify from "millify"
import {
  useGetCryptoDetailsApiQuery,
  useGetCryptoHistoryApiQuery,
} from "../services/cryptoApi.js"
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
  const { data, error, isLoading } = useGetCryptoDetailsApiQuery(coinId)
  const {
    data: coinHistory,
    error: errorHistory,
    isFetching: isFetchingHistory,
  } = useGetCryptoHistoryApiQuery({ coinId, timePeriod })

  const cryptoDetails = data?.data?.coin || []

  function getStats({ cryptoDetails }) {
    return [
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
  }

  function getGenericStats({ cryptoDetails }) {
    return [
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
  }

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"]

  return (
    <Box m={3}>
      {error && <AlertMessage type="error" errors={error} />}
      {isLoading ? (
        <Loader />
      ) : (
        cryptoDetails && (
          <>
            <Header
              title={`${cryptoDetails?.name}  (${cryptoDetails?.symbol})`}
              subtitle={HTMLReactParser(cryptoDetails?.description)}
            />
            <Box mb={3}>
              <SearchSelect
                inputLabel="Select Time Period"
                search={timePeriod}
                optionValue={time}
                onSearchChange={setTimePeriod}
              />
            </Box>
            {isFetchingHistory ? (
              <Loader />
            ) : coinHistory ? (
              <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails?.price)}
                coinName={cryptoDetails?.name}
              />
            ) : (
              errorHistory && (
                <AlertMessage type="error" errors={errorHistory} />
              )
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 7, md: 3 }}
                columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}
              >
                <CryptoDetailsList
                  title={`${cryptoDetails?.name} Value Statistics`}
                  subtitle={`An overview showing the stats of ${cryptoDetails?.name}`}
                  name={cryptoDetails?.name}
                  stats={getStats({ cryptoDetails })}
                />

                <CryptoDetailsList
                  title="Other Statistics"
                  subtitle="An overview showing the stats of all cryptocurrencies"
                  name={cryptoDetails?.name}
                  stats={getGenericStats({ cryptoDetails })}
                />

                <CryptoDetailsList
                  title={`${cryptoDetails?.name} Links`}
                  subtitle={` Various links related to ${cryptoDetails?.name}`}
                  links={cryptoDetails?.links}
                />
              </Grid>
            </Box>
          </>
        )
      )}
    </Box>
  )
}
