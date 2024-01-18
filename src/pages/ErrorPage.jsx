import { useRouteError } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export default function ErrorPage() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const error = useRouteError()

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Typography
          variant="h1"
          color={colors.greenAccent[500]}
          fontWeight="bold"
          sx={{ mb: 5, textAlign: "center" }}
        >
          Oops!
        </Typography>
        <Typography variant="body1" color={colors.grey[100]} mb={5}>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Box textAlign="center" color={colors.grey[100]}>
          <i>{error.statusText || error.message}</i>
        </Box>
      </Box>
    </Box>
  )
}
