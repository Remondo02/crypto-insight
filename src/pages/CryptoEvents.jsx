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

export default function CryptoEvents() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [search, setSearch] = useState("btc-bitcoin")

  const {
    data: cryptoCoins,
    error: cryptoCoinsError,
    isFetching: isFetchingCoins,
  } = useGetCryptoEventsCoinsApiQuery()

  const {
    data: cryptoEvents,
    error: cryptoEventsError,
    isFetching: isFetchingEvents,
  } = useGetCryptoEventsApiQuery({
    coinId: search,
  })

  if (isFetchingEvents || isFetchingCoins) {
    return <Loader />
  }

  if (cryptoCoinsError || cryptoEventsError) {
    return (
      <AlertMessage
        type="error"
        errors={[cryptoCoinsError, cryptoEventsError]}
      />
    )
  }

  const coins = []
  const convertedData = []
  let endDate

  for (let i = 0; i < 100; i++) {
    coins.push({ id: cryptoCoins[i].id, name: cryptoCoins[i].name })
  }

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

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CRYPTO EVENTS"
          subtitle="List of event related to a specific cryptocurrency"
        />
      </Box>
      {convertedData && (
        <Box>
          <Box mb={3}>
            <SearchSelect
              search={search}
              optionValue={coins}
              onSearchChange={setSearch}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}
            >
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Box backgroundColor={colors.primary[400]} p={2}>
                  <Typography variant="h5">Events</Typography>
                  <List>
                    {convertedData.map((event) => (
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
                            <Typography>
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
              <Grid item xs={4} sm={4} md={4} lg={8} xl={12}>
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
                  events={convertedData}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}
