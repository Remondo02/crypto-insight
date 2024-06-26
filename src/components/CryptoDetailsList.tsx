import { Link } from "react-router-dom"
import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import GitHubIcon from "@mui/icons-material/GitHub"
import RedditIcon from "@mui/icons-material/Reddit"
import TelegramIcon from "@mui/icons-material/Telegram"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { tokens } from "@/theme"
import { ReactNode } from "react"

function getIcon(type: string) {
  if (type === "github") return <GitHubIcon />
  if (type === "reddit") return <RedditIcon />
  if (type === "telegram") return <TelegramIcon />
  if (type === "twitter") return <TwitterIcon />
  if (type === "facebook") return <FacebookOutlinedIcon />
  if (type === "youtube") return <YouTubeIcon />
  return <LanguageOutlinedIcon />
}

interface ICryptoDetailsListItemProps extends StatsLinksProps {
  title: string
  subtitle: string
  name?: string
}

type StatsLinksProps = {
  links?: { name: string; url: string; type: string }[]
  stats?: { title: string; value: ReactNode; icon: ReactNode }[]
}

function CryptoDetailsListItem({ stats, links }: StatsLinksProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <List disablePadding sx={{ backgroundColor: colors.primary[400] }}>
      {links?.map((obj, i) => {
        return (
          <ListItem key={i} disablePadding divider={true}>
            <ListItemButton
              component={Link}
              to={obj.url}
              target="_blank"
              rel="noreferrer"
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: colors.greenAccent[500] }}>
                  {getIcon(obj.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: colors.grey[100],
                }}
                primary={obj.name}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
      {stats?.map((obj, i) => {
        return (
          <ListItem key={i} divider={true}>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: colors.greenAccent[500] }}>
                {obj.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: colors.grey[100],
              }}
              primary={obj.title}
              secondary={
                <Typography sx={{ color: colors.grey[100] }} fontWeight="bold">
                  {obj.value}
                </Typography>
              }
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default function CryptoDetailsList({
  title,
  subtitle,
  stats,
  links,
}: ICryptoDetailsListItemProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Grid item xs={1} sm={1} md={1} lg={1}>
      <Box marginBottom={2}>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="h3"
          color={colors.greenAccent[500]}
          mb={1}
        >
          {title}
        </Typography>
        <Typography variant="h5" component="h4" color={colors.grey[100]}>
          {subtitle}
        </Typography>
      </Box>
      {stats && <CryptoDetailsListItem stats={stats} />}
      {links && <CryptoDetailsListItem links={links} />}
    </Grid>
  )
}
