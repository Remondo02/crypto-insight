import { Link } from "react-router-dom"
import { Typography, Box, Button, useTheme } from "@mui/material"
import { tokens } from "@/theme"

type SecontHeaderProps = {
  title: string
  to?: string
  buttonLabel?: string
}

export default function SectionHeader({
  title,
  to,
  buttonLabel,
}: SecontHeaderProps) {
  const showButton = !!(to && buttonLabel)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box mb={3} display="flex" justifyContent="space-between">
      {title && (
        <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
          {title}
        </Typography>
      )}
      {showButton && (
        <Button variant="outlined" component={Link} to={to} color="secondary">
          {buttonLabel}
        </Button>
      )}
    </Box>
  )
}
