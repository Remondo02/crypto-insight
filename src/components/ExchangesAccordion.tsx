import {
  useState,
} from "react"
import millify from "millify"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined"
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined"
import EventIcon from "@mui/icons-material/Event"
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
import { tokens } from "@/theme"
import { AlertMessage } from "./index"
import { type ExchangesApiResponse } from "@/apis"

export default function ExchangesAccordion({
  exchange,
}: {
  exchange: ExchangesApiResponse
}) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [expanded, setExpanded] = useState("")
  const handleChange = () => {
    setExpanded((val) =>
      val.includes(`panel${exchange.id}`) ? "" : `panel${exchange.id}`
    )
  }
  return (
    <Accordion
      style={{ color: colors.grey[100] }}
      sx={{
        backgroundColor: colors.primary[400],
      }}
      key={exchange.id}
      expanded={expanded === `panel${exchange.id}`}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${exchange.id}bh-content`}
        id={`panel${exchange.id}bh-header`}
        sx={{ minHeight: "57px" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ width: { xs: "100%", md: "50%" } }}
        >
          <Box display="flex" gap={1}>
            <Typography sx={{ color: colors.grey[100] }}>
              {exchange.trust_score_rank}
            </Typography>
            {exchange.image && (
              <Box>
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={exchange.image}
                  alt=""
                />
              </Box>
            )}
            <Typography sx={{ color: colors.grey[100] }}>
              {exchange.name}
            </Typography>
          </Box>
          <Typography sx={{ color: colors.grey[100] }}>
            {millify(exchange.trade_volume_24h_btc_normalized)}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 4 }}>
          {exchange.description ? (
            <Typography>{exchange.description}</Typography>
          ) : (
            <AlertMessage
              type="info"
              error={`No description available from the API. Please visite ${exchange.name} website for more informations.`}
            />
          )}
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="space-between"
        >
          {exchange.country && (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ backgroundColor: colors.greenAccent[500] }}>
                <FlagCircleOutlinedIcon />
              </Avatar>
              <Typography sx={{ color: colors.grey[100] }}>
                {exchange.country}
              </Typography>
            </Box>
          )}
          {exchange.year_established && (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ backgroundColor: colors.greenAccent[500] }}>
                <EventIcon />
              </Avatar>
              <Typography sx={{ color: colors.grey[100] }}>
                {exchange.year_established}
              </Typography>
            </Box>
          )}
          {exchange.url && (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ backgroundColor: colors.greenAccent[500] }}>
                <LinkOutlinedIcon />
              </Avatar>
              <Link
                variant="body1"
                href={exchange.url}
                underline="hover"
                sx={{ color: colors.grey[100] }}
                target="_blank"
                rel="noreferrer"
              >
                {exchange.url}
              </Link>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
