import { Alert, Box, AlertTitle, Stack, useTheme } from "@mui/material"
import { tokens } from "../theme.js"
import errorMessage from "../utils/errorMessage.js"

// Error, warning, info, success
export default function AlertMessage({ type = "error", error }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const errorMsg = errorMessage(error)

  const styles =
    type === "info" ? { backgroundColor: colors.greenAccent[500] } : {}

  return (
    <Box>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert sx={styles} severity={type} variant="filled">
          <AlertTitle>{type}</AlertTitle>
          {errorMsg}
        </Alert>
      </Stack>
    </Box>
  )
}
