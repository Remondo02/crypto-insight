import { NavLink } from "react-router-dom"
import { MenuItem } from "react-pro-sidebar"
import { Typography } from "@mui/material"

export default function SideBarItem({ title, to, icon }) {
  return (
    <MenuItem
      component={
        <NavLink
          to={to}
          style={({ isActive }) => {
            return {
              color: isActive ? "#6870fa" : "",
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
