import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import GitHubIcon from "@mui/icons-material/GitHub"
import RedditIcon from "@mui/icons-material/Reddit"
import TelegramIcon from "@mui/icons-material/Telegram"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined"
import YouTubeIcon from "@mui/icons-material/YouTube"
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
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined"
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined"
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"

import millify from "millify"

export function getGlobalStats(globalStats, colors) {
  const styles = { color: colors.grey[100], fontSize: 26 }
  return [
    {
      title: "Total Cryptocurrencies",
      value: globalStats.total,
      icon: <CurrencyBitcoinIcon style={styles} />,
    },
    {
      title: "Total Exchanges",
      value: millify(globalStats.totalExchanges),
      icon: <CurrencyExchangeOutlinedIcon style={styles} />,
    },
    {
      title: "Total Market Cap",
      value: millify(globalStats.totalMarketCap),
      icon: <QueryStatsOutlinedIcon style={styles} />,
    },
    {
      title: "Total 24h Volume",
      value: millify(globalStats.total24hVolume),
      icon: <UpdateOutlinedIcon style={styles} />,
    },
    {
      title: "Total Markets",
      value: millify(globalStats.totalMarkets),
      icon: <PaidOutlinedIcon style={styles} />,
    },
  ]
}

export function getIcon(type) {
  if (type === "github") return <GitHubIcon />
  if (type === "reddit") return <RedditIcon />
  if (type === "telegram") return <TelegramIcon />
  if (type === "twitter") return <TwitterIcon />
  if (type === "facebook") return <FacebookOutlinedIcon />
  if (type === "youtube") return <YouTubeIcon />
  return <LanguageOutlinedIcon />
}

export function getStats(cryptoDetails) {
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

export function getGenericStats(cryptoDetails) {
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