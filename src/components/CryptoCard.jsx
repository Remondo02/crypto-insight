import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"
import { tokens } from "../theme.js"
import { Link } from "react-router-dom"
import millify from "millify"

function CryptoCardWrapper({ url, children }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const styles = { backgroundColor: colors.primary[400] }
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      {url ? (
        <Link to={`/crypto/${url}`} style={{ textDecoration: "none" }}>
          <Card sx={styles}>{children}</Card>
        </Link>
      ) : (
        <Card sx={styles}>{children}</Card>
      )}
    </Grid>
  )
}

export function CryptoCard({ currency }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <CryptoCardWrapper url={currency.uuid}>
      <CardActionArea>
        <Box display="flex" justifyContent="space-between" mb={2} p={2}>
          {currency.name && (
            <Typography variant="h5" component="div" color={colors.grey[100]}>
              {`${currency?.rank} .`} {currency.name}
            </Typography>
          )}
          {currency.iconUrl && (
            <Avatar
              alt={`Icon ${currency.name ?? ""}`}
              src={currency.iconUrl}
            />
          )}
        </Box>
        <Divider />
        <CardContent>
          {currency.price && (
            <Typography variant="body1" color="text.secondary">
              Price: {millify(currency.price)}
            </Typography>
          )}
          {currency.marketCap && (
            <Typography variant="body1" color="text.secondary">
              Market Cap: {millify(currency.marketCap)}
            </Typography>
          )}
          {currency.change && (
            <Typography variant="body1" color="text.secondary">
              Daily Change: {currency.change}%
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </CryptoCardWrapper>
  )
}
