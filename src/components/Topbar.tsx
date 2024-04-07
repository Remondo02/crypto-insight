import { BaseSyntheticEvent, useState } from "react"
import { Link } from "react-router-dom"
import { Box, Button, Menu, MenuItem, useTheme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { tokens } from "@/theme"
import ThemeButton from "./ThemeButton"

export default function Topbar() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: BaseSyntheticEvent) => {
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
      {!isMobile && <ThemeButton />}
      <Box display="flex" justifyContent="flex-end">
        {isMobile && <ThemeButton />}
        {isMobile && (
          <Button
            sx={{ color: buttonColor }}
            id="menu"
            aria-label="Mobile Navigation Button"
            aria-controls={open ? "menu-open" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuOutlinedIcon />
          </Button>
        )}
      </Box>
      <Menu
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.primary[400],
          },
        }}
        id="menu-open"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu",
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
