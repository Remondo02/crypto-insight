import { useState } from "react"
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { formatDate } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { tokens } from "../theme.js"
import {
  useGetCryptoEventsApiQuery,
  useGetCryptoEventsCoinsApiQuery,
} from "../services/cryptoEventsApi.js"
import { AlertMessage, Header, Loader, SearchSelect } from "../components"

function coins({ cryptoCoins }) {
  const coins = []

  for (let i = 0; i < 100; i++) {
    coins.push({ id: cryptoCoins[i].id, name: cryptoCoins[i].name })
  }

  return coins
}

function converted({ cryptoEvents }) {
  const convertedData = []
  let endDate

  for (const event of cryptoEvents) {
    if (event.date_to < event.date) {
      endDate = event.date
    }
    convertedData.push({
      id: event.id,
      title: event.name ?? event.description,
      start: event.date,
      formatTime: new Date(event.date).getTime(),
      end: endDate ?? event.date,
      allDay: false,
    })
  }

  return convertedData.reverse()
}

export default function CryptoEvents() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [search, setSearch] = useState("btc-bitcoin")

  const {
    data: cryptoCoins,
    error: cryptoCoinsError,
    isLoading: isLoadingCoins,
  } = useGetCryptoEventsCoinsApiQuery()

  const {
    data: cryptoEvents,
    error: cryptoEventsError,
    isLoading: isLoadingEvents,
    isFetching: isFetchingEvents,
  } = useGetCryptoEventsApiQuery({
    coinId: search,
  })

  const calendarStyles = {
    ".fc-theme-standard .fc-popover": { backgroundColor: colors.primary[400] },
    ".fc .fc-daygrid-day.fc-day-today": {
      backgroundColor: colors.greenAccent[500],
    },
  }

  const calendarStylesMobile = {
    ...calendarStyles,
    ".fc .fc-toolbar": { flexDirection: "column", gap: 1 },
  }

  return (
    <Box m={3} height="inherit">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CRYPTO EVENTS"
          subtitle="List of events related to a specific cryptocurrency"
        />
      </Box>
      {cryptoCoinsError ||
        (cryptoEventsError && (
          <AlertMessage
            type="error"
            errors={[cryptoCoinsError, cryptoEventsError]}
          />
        ))}
      {isLoadingCoins || isLoadingEvents ? (
        <Loader />
      ) : (
        cryptoEvents && (
          <Box height={isFetchingEvents ? "inherit" : ""}>
            <Box mb={3}>
              <SearchSelect
                inputLabel="Select a Crypto"
                search={search}
                optionValue={coins({ cryptoCoins })}
                onSearchChange={setSearch}
              />
            </Box>
            {isFetchingEvents ? (
              <Loader />
            ) : (
              <>
                {converted({ cryptoEvents }).length > 0 ? (
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 7, md: 3 }}
                      columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Box backgroundColor={colors.primary[400]} p={2}>
                          <Typography variant="h5" component="h3">
                            Events
                          </Typography>
                          <List>
                            {converted({ cryptoEvents }).map((event) => (
                              <ListItem
                                key={event.id}
                                sx={{
                                  backgroundColor: colors.greenAccent[500],
                                  margin: "10px 0",
                                  borderRadius: "2px",
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
                            ))}
                          </List>
                        </Box>
                      </Grid>
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
                          plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                          ]}
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
                          events={converted({ cryptoEvents })}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <AlertMessage type="info" errors={"No event found"} />
                )}
              </>
            )}
          </Box>
        )
      )}
    </Box>
  )
}
