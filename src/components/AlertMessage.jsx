import { Alert, Box, AlertTitle, Stack, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

// Error, warning, info, success
export default function AlertMessage({ type = "error", error }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const styles =
    type === "info" ? { backgroundColor: colors.greenAccent[500] } : ""

  const errorType = (error) => {
    if (error?.data?.message) {
      return error.data.message
    }
    if (error?.data?.error?.message) {
      return error.data.error.message
    }
    if (error?.error) {
      return error.error
    }
    if (error?.data?.status?.error_message) {
      return error.data.status.error_message
    }
    if (error?.data?.error) {
      return error.data.error
    }
    if(typeof error === "string") {
      return error
    }
    return "Undefined error"
  }

  return (
    <Box>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert sx={styles} severity={type} variant="filled">
          <AlertTitle>{type}</AlertTitle>
          {errorType(error)}
        </Alert>
      </Stack>
    </Box>
  )
}
