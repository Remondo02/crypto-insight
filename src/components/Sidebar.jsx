import { useState } from "react"
import { Sidebar as ProSideBar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined"
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import SideBarItem from "./SidebarItem.jsx"
import { tokens } from "../theme.js"

export default function Sidebar() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <ProSideBar
      rootStyles={{
        borderRightStyle: "none",
        flexShrink: 0,
      }}
      backgroundColor={`${colors.primary[400]}`}
      width={"290px"}
      collapsed={isCollapsed}
    >
      <Menu
        iconShape="square"
        menuItemStyles={{
          button: () => {
            const baseStyle = {
              padding: "5px 20px",
              "&:hover": {
                color: "#868dfb !important",
                backgroundColor: "transparent",
              },
            }
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
          <SideBarItem
            title="Dashboard"
            to="/"
            icon={<HomeOutlinedIcon />}
          />
          <SideBarItem
            title="Cryptocurrencies"
            to="/cryptocurrencies"
            icon={<CurrencyBitcoinOutlinedIcon />}
          />
          <SideBarItem
            title="Exchanges"
            to="/exchanges"
            icon={<CurrencyExchangeOutlinedIcon />}
          />
          <SideBarItem
            title="News"
            to="/news"
            icon={<FeedOutlinedIcon />}
          />
          <SideBarItem
            title="Events"
            to="/events"
            icon={<CalendarMonthOutlinedIcon />}
          />
        </Box>
      </Menu>
    </ProSideBar>
  )
}
