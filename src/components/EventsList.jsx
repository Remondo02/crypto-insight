import { Link } from "react-router-dom"
import { Box, Grid, List, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"
import EventsListItem from "./EventsListItem.jsx"

export default function EventsList({ events }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      <Box backgroundColor={colors.primary[400]} p={2}>
        <Typography variant="h5" component="h3">
          Events
        </Typography>
        <List>
          {events.data.map((event) =>
            event.link ? (
              <Link
                key={event.id}
                to={event.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <EventsListItem key={event.id} event={event} />
              </Link>
            ) : (
              <EventsListItem key={event.id} event={event} />
            )
          )}
        </List>
      </Box>
    </Grid>
  )
}
