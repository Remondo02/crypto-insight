import { useState } from "react"
import millify from "millify"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Link,
  Typography,
  useTheme,
} from "@mui/material"
import { useGetCryptoExchangesApiQuery } from "../services/cryptoExchangesApi.js"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined"
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined"
import EventIcon from "@mui/icons-material/Event"
import { tokens } from "../theme.js"
import { AlertMessage, Header, Loader } from "../components"

export default function Exchanges() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const {
    data: cryptoExchanges,
    error,
    isLoading,
  } = useGetCryptoExchangesApiQuery()

  const [expanded, setExpanded] = useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <AlertMessage type="error" errors={error} />
  }

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EXCHANGES"
          subtitle="List of top 100 exchanges plateformes"
        />
      </Box>
      <Box display="flex" ml={2} py={2}>
        <Box width="calc(50% - 56px)">Exchanges</Box>
        <Box width="50%">24h Trade Volume</Box>
      </Box>
      {cryptoExchanges &&
        cryptoExchanges.map((exchange, i) => (
          <Accordion
            style={{ color: colors.grey[100] }}
            sx={{
              backgroundColor: colors.primary[400],
            }}
            key={exchange.id}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}bh-content`}
              id={`panel${i}bh-header`}
            >
              <Box display="flex" justifyContent="space-between" width="50%">
                <Box display="flex" gap={1}>
                  <Typography sx={{ color: "text.secondary" }}>
                    {exchange.trust_score_rank}
                  </Typography>
                  {exchange.image && (
                    <Box>
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        src={exchange.image}
                        alt=""
                        loading="lazy"
                      />
                    </Box>
                  )}
                  <Typography sx={{ color: "text.secondary" }}>
                    {exchange.name}
                  </Typography>
                </Box>
                <Typography sx={{ color: "text.secondary" }}>
                  {millify(exchange.trade_volume_24h_btc_normalized)}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 4 }}>
                <Typography>
                  {exchange.description || (
                    <AlertMessage
                      type="info"
                      errors={`No description available from the API. please visite ${exchange.name} website for more informations.`}
                    />
                  )}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                {exchange.country && (
                  <Box display="flex" gap={1}>
                    <FlagCircleOutlinedIcon />
                    <Typography sx={{ color: "text.secondary" }}>
                      {exchange.country}
                    </Typography>
                  </Box>
                )}
                {exchange.year_established && (
                  <Box display="flex" gap={1}>
                    <EventIcon />
                    <Typography sx={{ color: "text.secondary" }}>
                      {exchange.year_established}
                    </Typography>
                  </Box>
                )}
                {exchange.url && (
                  <Box display="flex" gap={1}>
                    <LinkOutlinedIcon />
                    <Link
                      variant="body1"
                      href={exchange.url}
                      underline="hover"
                      sx={{ color: "text.secondary" }}
                      target="_blank"
                      el="noreferrer"
                    >
                      {exchange.url}
                    </Link>
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  )
}
