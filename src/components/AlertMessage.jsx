import { Alert, AlertTitle, Stack, Box } from "@mui/material"

// Error, warning, info, success
export function AlertMessage({ type = "error", children }) {
  return (
    <Box m={3}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={type} variant="filled">
          <AlertTitle>{type}</AlertTitle>
          {children}
        </Alert>
      </Stack>
    </Box>
  )
}
