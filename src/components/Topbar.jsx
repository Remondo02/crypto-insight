import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Button, Menu, MenuItem, useTheme } from "@mui/material"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { tokens } from "../theme.js"
import ThemeButton from "./ThemeButton.jsx"

export default function Topbar({ page }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const buttonColor =
    theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.54)"

  const menuItemStyles = { color: colors.grey[100] }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <ThemeButton />
        <Button
          sx={{ color: buttonColor }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuOutlinedIcon />
        </Button>
      </Box>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.primary[400],
          },
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={menuItemStyles} component={Link} to="/">
          Dashboard
        </MenuItem>
        <MenuItem sx={menuItemStyles} component={Link} to="/cryptocurrencies">
          Cryptocurrencies
        </MenuItem>
        <MenuItem sx={menuItemStyles} component={Link} to="/exchanges">
          Exchanges
        </MenuItem>
        <MenuItem sx={menuItemStyles} component={Link} to="/news">
          News
        </MenuItem>
        <MenuItem sx={menuItemStyles} component={Link} to="/events">
          Events
        </MenuItem>
      </Menu>
    </Box>
  )
}
