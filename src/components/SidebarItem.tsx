import { NavLink } from "react-router-dom"
import { MenuItem } from "react-pro-sidebar"
import { Typography, useTheme } from "@mui/material"
import { tokens } from "@/theme"

export default function SideBarItem({
  title,
  to,
  icon,
}: {
  title: string
  to: string
  icon: React.ReactNode
}) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <MenuItem
      component={
        <NavLink
          to={to}
          style={({ isActive }) => {
            return {
              color: isActive ? "#6870fa" : colors.grey[100],
            }
          }}
        />
      }
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  )
}
