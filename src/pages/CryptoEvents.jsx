import { formatDate } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'

import {
  useGetCryptoEventsApiQuery,
  useGetCryptoEventsCoinsApiQuery,
} from "../services/cryptoEventsApi.js"
import { AlertMessage } from "../components/AlertMessage.jsx"
import { Box, useTheme } from "@mui/material"
import { Header } from "../components/Header.jsx"
import { SearchSelect } from "../components/SearchSelect.jsx"
import { Loader } from "../components/Loader.jsx"
import { useState } from "react"
import { tokens } from "../theme.js"


function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export function CryptoEvents() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [search, setSearch] = useState("btc-bitcoin")
  const schedulerTheme = theme.palette.mode === "dark" ? "e-dark-mode" : ""

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
      // allDay: false,
    })
  }

  const latestEvent = convertedData.reduce(
    (acc, val) =>
      acc.formatTime > val.formatTime ? acc.formatTime : val.formatTime,
    0
  )

  console.log(convertedData)

  return (
    <div className={schedulerTheme}>
      <Box m={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CRYPTO CURRENCIES"
            subtitle="All reccent events related to currencies"
          />
        </Box>
        <Box mb={3}>
          <SearchSelect
            search={search}
            optionValue={coins}
            onSearchChange={setSearch}
          />
        </Box>
        {!!latestEvent && (
          <Box>
            <div className="demo-app-main">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next,today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                editable={false}
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true}
                events={convertedData}
                // eventContent={renderEventContent}
              />
            </div>
          </Box>
        )}
      </Box>
    </div>
  )
}

export default CryptoEvents
