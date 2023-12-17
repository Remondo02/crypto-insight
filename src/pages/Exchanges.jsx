import { useState } from "react"
import HTMLReactParser from "html-react-parser"
import millify from "millify"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
  useTheme,
} from "@mui/material"
import { useGetCryptoExchangesApiQuery } from "../services/cryptoExchangesApi.js"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { tokens } from "../theme.js"
import {
  AlertMessage,
  Header,
} from "../components"

export default function Exchanges() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const {
    data: cryptoExchanges,
    error,
    isLoading,
    isFetching,
  } = useGetCryptoExchangesApiQuery()

  const [expanded, setExpanded] = useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  if (error) {
    return <AlertMessage type="error" errors={error} />
  }

  let disabled
  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="EXCHANGES" subtitle="Exchanges" />
      </Box>
      <Box display="flex" ml={7} py={2}>
        <Box width="25%" flexShrink={0}>
          Exchanges
        </Box>
        <Box width="25%" flexShrink={0}>
          24h Trade Volume
        </Box>
        <Box width="25%" flexShrink={0}>
          Markets
        </Box>
        <Box width="25%" flexShrink={0}>
          Change
        </Box>
      </Box>
      {cryptoExchanges &&
        cryptoExchanges.map((exchange, i) => (
          <Accordion
            style={{ color: colors.grey[100] }}
            sx={{
              backgroundColor: colors.primary[400],
            }}
            disabled={
              exchange.description === ""
                ? (disabled = true)
                : (disabled = false)
            }
            key={exchange.id}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}bh-content`}
              id={`panel${i}bh-header`}
            >
              {exchange.image && (
                <Avatar
                  sx={{ width: 24, height: 24, mr: 2 }}
                  src={exchange.image}
                  alt=""
                  loading="lazy"
                />
              )}
              <Typography
                sx={{ width: "25%", flexShrink: 0, color: "text.secondary" }}
              >
                {exchange.trust_score_rank}. {exchange.name}
              </Typography>
              <Typography
                sx={{ width: "25%", flexShrink: 0, color: "text.secondary" }}
              >
                {millify(exchange.trade_volume_24h_btc_normalized)}
              </Typography>
              <Typography
                sx={{ width: "25%", flexShrink: 0, color: "text.secondary" }}
              >
                {exchange.trust_score_rank}. {exchange.name}
              </Typography>
              <Typography
                sx={{ width: "25%", flexShrink: 0, color: "text.secondary" }}
              >
                {exchange.trust_score_rank}. {exchange.name}
              </Typography>
            </AccordionSummary>
            {exchange.description && (
              <AccordionDetails>
                <Typography>
                  {HTMLReactParser(exchange.description || "")}
                </Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
    </Box>
  )
}
