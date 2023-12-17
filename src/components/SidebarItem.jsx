import { Link } from "react-router-dom"
import { MenuItem } from "react-pro-sidebar"
import { Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export default function SideBarItem({ title, to, icon, selected, setSelected }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected.toLowerCase() === title.toLowerCase()}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  )
}
