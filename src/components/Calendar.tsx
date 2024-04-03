import { useMediaQuery, useTheme, Grid } from "@mui/material"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { tokens } from "@/theme"
import {type EventsDataProps } from "@/utils/eventsData"

export default function Calendar(events: EventsDataProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const calendarStyles = {
    ".fc-theme-standard .fc-popover": { backgroundColor: colors.primary[400] },
    ".fc .fc-daygrid-day.fc-day-today": {
      backgroundColor: colors.primary[400],
    },
    ".fc-event.fc-event-start.fc-event-end.fc-event-future.fc-daygrid-event.fc-daygrid-dot-event":
      {
        backgroundColor: colors.greenAccent[500],
      },
    ".fc-event.fc-event-start.fc-event-end.fc-event-past.fc-daygrid-event.fc-daygrid-dot-event":
      {
        backgroundColor: colors.greenAccent[500],
      },
  }

  const calendarStylesMobile = {
    ...calendarStyles,
    ".fc .fc-toolbar": { flexDirection: "column", gap: 1 },
  }

  return (
    <Grid
      sx={isMobile ? calendarStylesMobile : calendarStyles}
      item
      xs={4}
      sm={4}
      md={4}
      lg={8}
      xl={12}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events.data}
        initialDate={events.latestEvent}
      />
    </Grid>
  )
}
