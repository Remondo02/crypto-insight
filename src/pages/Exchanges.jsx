import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
  useTheme,
} from "@mui/material"
import { Header } from "../components/Header.jsx"
import { useGetCryptoExchangesApiQuery } from "../services/cryptoExchangesApi.js"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"
import HTMLReactParser from "html-react-parser"
import millify from "millify"
import { tokens } from "../theme.js"

export function Exchanges() {
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
      {/* <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  )
}
