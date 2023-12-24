import { Alert, Box, AlertTitle, Stack, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

// Error, warning, info, success
export default function AlertMessage({ type = "error", errors }) {
  // console.log(errors)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const styles =
    type === "info" ? { backgroundColor: colors.greenAccent[500] } : ""

  return (
    <Box>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {typeof errors === "object" ? (
          Array.isArray(errors) ? (
            errors.map((error, i) => (
              <AlertContent key={i} type={type} error={error} />
            ))
          ) : (
            <AlertContent type={type} error={errors} />
          )
        ) : (
          <AlertContent type={type} error={errors} styles={styles} />
        )}
      </Stack>
    </Box>
  )
}

function AlertContent({ type, error, styles }) {
  return (
    <Alert sx={styles} severity={type} variant="filled">
      <AlertTitle>{type}</AlertTitle>
      {error?.data?.message && error?.data?.message}
      {error?.data?.error && error?.data?.error}
      {error?.error && error?.error}
      {error?.data?.status?.error_message && error?.data?.status?.error_message}
      {typeof error === "string" && error}
      {error === undefined && "Undefined error"}
    </Alert>
  )
}
