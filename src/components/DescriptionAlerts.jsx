import { Alert, AlertTitle, Stack, Box } from "@mui/material"

// Error, warning, info, success
export function DescriptionAlerts({ type, error }) {
  return (
    <Box m={3}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={type} variant="filled">
          <AlertTitle>{type}</AlertTitle>
          {error.data.message.toString()}
        </Alert>
      </Stack>
    </Box>
  )
}
