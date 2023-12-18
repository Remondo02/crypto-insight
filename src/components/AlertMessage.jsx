import { Box, Alert, AlertTitle, Stack, useTheme } from "@mui/material"
import { tokens } from "../theme.js"
// Error, warning, info, success
export default function AlertMessage({ type = "error", errors }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  let style = ""

  type === "info"
    ? (style = { backgroundColor: colors.greenAccent[500] })
    : style

  return (
    <Box m={3}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {typeof errors === "string" && (
          <Alert sx={style} severity={type} variant="filled">
            <AlertTitle>{type}</AlertTitle>
            {errors}
          </Alert>
        )}
        {Array.isArray(errors) ? (
          errors.map((error, i) => {
            return <AlertContent key={i} type={type} errors={error} />
          })
        ) : (
          <AlertContent type={type} errors={errors} />
        )}
      </Stack>
    </Box>
  )
}

function AlertContent({ type, errors }) {
  return (
    <Alert severity={type} variant="filled">
      <AlertTitle>{type}</AlertTitle>
      {errors?.data?.message && errors?.data?.message}
      {errors?.data?.error && errors?.data?.error}
      {errors?.error && errors?.error}
      {errors === undefined && "Undefined error"}
    </Alert>
  )
}
