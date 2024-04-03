import { ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import { formatDate } from "@fullcalendar/core"
import { tokens } from "@/theme"
import { type EventDataProps } from "@/utils/eventsData"

export default function EventsListItem({ event }: { event: EventDataProps }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <ListItem
      sx={{
        backgroundColor: colors.greenAccent[500],
        margin: "10px 0",
        borderRadius: "2px",
        transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          backgroundColor: colors.greenAccent[600],
        },
      }}
    >
      <ListItemText
        primary={event.title}
        secondary={
          <Typography variant="body2">
            {formatDate(event.start, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        }
      ></ListItemText>
    </ListItem>
  )
}
