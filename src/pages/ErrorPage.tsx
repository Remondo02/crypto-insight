import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "@/theme"

export default function ErrorPage() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const error = useRouteError()
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    // errorMessage = error.error?.message || error.statusText;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

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
          <i>{errorMessage}</i>
        </Box>
      </Box>
    </Box>
  )
}
