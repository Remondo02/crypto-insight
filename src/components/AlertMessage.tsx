import {
  Alert,
  Box,
  AlertTitle,
  Stack,
  useTheme,
  type AlertColor,
} from "@mui/material"
import { tokens } from "@/theme"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"

type AlertMessageProps = {
  type: AlertColor
  error: FetchBaseQueryError | SerializedError | string
}

// Error, warning, info, success
export default function AlertMessage({
  type = "error",
  error,
}: AlertMessageProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  let errorMessage: unknown

  const styles =
    type === "info" ? { backgroundColor: colors.greenAccent[500] } : {}

  if (typeof error === "object") {
    if ("status" in error) {
      if ("error" in error) {
        errorMessage = error.error
      }
      if (error.data && typeof error.data === "object") {
        if ("message" in error.data) {
          errorMessage = error.data.message
        }
        if ("status" in error.data && typeof error.data.status === "object") {
          if (error.data.status && "error_message" in error.data.status) {
            errorMessage = error.data.status.error_message
          }
        }
        if ("error" in error.data && typeof error.data.error === "object") {
          if (error.data.error && "message" in error.data.error) {
            errorMessage = error.data.error.message
          }
        } else if (
          "error" in error.data &&
          typeof error.data.error === "string"
        ) {
          errorMessage = error.data.error
        }
      }
    } else {
      errorMessage = error.message
    }
  } else if (typeof error === "string") {
    errorMessage = error
  } else {
    errorMessage = "Undefined error"
  }

  return (
    <Box>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert sx={styles} severity={type} variant="filled">
          <AlertTitle>{type}</AlertTitle>

          {JSON.stringify(errorMessage).replace(/\"/g, '')}
        </Alert>
      </Stack>
    </Box>
  )
}
