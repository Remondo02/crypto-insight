import {
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
  Link,
  useTheme,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import { tokens } from "../theme.js"
import { getIcon } from "../utils/singleUtils.jsx"

export function SingleList({ title, subtitle, stats, links }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Grid item sm={12} md={6} lg={4}>
      <>
        <Box marginBottom={2}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h4"
            color={colors.greenAccent[500]}
            mb={1}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={colors.grey[100]}>
            {subtitle}
          </Typography>
        </Box>
        {stats && (
          <Box backgroundColor={colors.primary[400]}>
            {stats.map(({ icon, title, value }) => (
              <Box key={title}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                >
                  <Box display="flex" alignItems="inherit">
                    <Avatar sx={{ bgcolor: colors.greenAccent[500], mr: 2 }}>
                      {icon}
                    </Avatar>
                    <Typography variant="body1" color={colors.grey[100]}>
                      {title}
                    </Typography>
                  </Box>
                  <Typography
                    component="div"
                    fontWeight="bold"
                    sx={{ color: colors.grey[100] }}
                  >
                    {value}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>
        )}
        {links && (
          <Box backgroundColor={colors.primary[400]}>
            {links.map(({ name, type, url }, i) => (
              <Link
                href={url}
                underline="none"
                target="_blank"
                rel="noreferrer"
                key={i}
                sx={{
                  color: colors.grey[100],
                  ".MuiListItemText-root": {
                    display: "flex",
                    justifyContent: "space-between",
                  },
                }}
              >
                <ListItem component="div" disablePadding divider={true}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: colors.greenAccent[500] }}>
                        {getIcon(type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </Box>
        )}
      </>
    </Grid>
  )
}
