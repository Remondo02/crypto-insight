import { useState } from "react"
import { Sidebar as ProSideBar, Menu } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined"
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import SideBarItem from "./SidebarItem"
import { tokens } from "@/theme"

export default function Sidebar() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    !isMobile && (
      <ProSideBar
        rootStyles={{
          borderRightStyle: "none",
          flexShrink: 0,
        }}
        backgroundColor={`${colors.primary[400]}`}
        width={"290px"}
        collapsed={isCollapsed}
      >
        <Box
          display="flex"
          margin={"15px 20px 25px"}
          color={colors.grey[100]}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
              mr="5px"
            >
              <Typography
                variant="h3"
                whiteSpace="nowrap"
                color={colors.grey[100]}
              >
                CRYPTO INSIGHT
              </Typography>
            </Box>
          )}
          <IconButton
            id="sidebarMenuButton"
            aria-label="Sidebar Menu Button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
        <Menu
          menuItemStyles={{
            button: () => {
              const baseStyle = {
                padding: `5px 20px 5px ${isCollapsed ? "20px" : "17%"}`,
                "&:hover": {
                  color: "#868dfb !important",
                  backgroundColor: "transparent",
                },
              }
              return baseStyle
            },
          }}
        >
          <SideBarItem title="Dashboard" to="/" icon={<HomeOutlinedIcon />} />
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
          <SideBarItem title="News" to="/news" icon={<FeedOutlinedIcon />} />
          <SideBarItem
            title="Events"
            to="/events"
            icon={<CalendarMonthOutlinedIcon />}
          />
        </Menu>
      </ProSideBar>
    )
  )
}
