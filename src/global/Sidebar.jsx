import { useState } from "react"
import { Sidebar as ProSideBar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { tokens } from "./../theme.js"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined"
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
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

export function Sidebar({page}) {
  console.log(page)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState(page)

  return (
    <ProSideBar
      rootStyles={{
        borderRightStyle: "none",
        flexShrink: 0,
      }}
      backgroundColor={`${colors.primary[400]}`}
      // width={"313.9px"}
      width={"290px"}
      collapsed={isCollapsed}
    >
      <Menu
        iconShape="square"
        menuItemStyles={{
          button: ({ active }) => {
            const baseStyle = {
              padding: "5px 20px",
              "&:hover": {
                color: "#868dfb !important",
                backgroundColor: "transparent",
              },
            }
            if (active) return { ...baseStyle, color: "#6870fa !important" }
            return baseStyle
          },
        }}
      >
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.grey[100]}>
                CRYPTO INSIGHT
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Crypto Currencies"
            to="/cryptocurrencies"
            icon={<CurrencyBitcoinOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Exchanges"
            to="/exchanges"
            icon={<CurrencyExchangeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="News"
            to="/news"
            icon={<FeedOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Events"
            to="/events"
            icon={<CalendarMonthOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </ProSideBar>
  )
}
