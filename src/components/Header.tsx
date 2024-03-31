import { Box, Typography, Divider, useTheme } from "@mui/material"
import { tokens } from "@/theme"

type HeaderProps = {
  title: string
  subtitle: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box mb={7} width="100%">
      <Box mb={3}>
        {title && (
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="h2" color={colors.greenAccent[500]}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Divider />
    </Box>
  )
}
