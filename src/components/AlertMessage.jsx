import { Box, Alert, AlertTitle, Stack, useTheme } from "@mui/material"
import { tokens } from "../theme.js"
// Error, warning, info, success
export default function AlertMessage({ type = "error", errors }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  let style = ''

  type === "info"
    ? (style = { backgroundColor: colors.greenAccent[500] })
    : style

  return (
    <Box m={3}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {typeof errors === "string" ? (
          <Alert sx={style} severity={type} variant="filled">
            <AlertTitle>{type}</AlertTitle>
            {errors}
          </Alert>
        ) : (
          errors.map((error, i) => (
            <Alert key={i} severity={type} variant="filled">
              <AlertTitle>{type}</AlertTitle>
              {error ? error?.data?.message ?? error?.error : "undefined"}
            </Alert>
          ))
        )}
      </Stack>
    </Box>
  )
}
