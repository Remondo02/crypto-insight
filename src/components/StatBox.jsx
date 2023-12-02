import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function StatBox({ title, value, icon }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box backgroundColor={colors.primary[400]} padding={2}>
      {icon && (
        <Box display="flex" justifyContent="flex-start" mb={1}>
          {icon}
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {title && (
          <Typography variant="body1" sx={{ color: colors.greenAccent[500] }}>
            {title}
          </Typography>
        )}
        {value && (
          <Typography
            variant="h4"
            component="div"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
