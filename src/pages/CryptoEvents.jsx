import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule"
import "./../calendar.css"

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
    const error = { ...cryptoCoinsError, ...cryptoEventsError }
    return (
      <AlertMessage type="error">
        {error?.data?.message?.toString()}
      </AlertMessage>
    )
  }

  const coins = []

  cryptoCoins.map((coin, i) => {
    if (i < 100) {
      coins.push({
        id: coin.id,
        name: coin.name,
      })
    }
  })

  const convertedData = []
  let endDate
  cryptoEvents.map((event) => {
    if (event.date_to < event.date) {
      endDate = event.date
    }
    convertedData.push({
      id: event.id,
      Subject: event.name ?? event.description,
      StartTime: event.date,
      formatTime: new Date(event.date).getTime(),
      EndTime: endDate ?? event.date,
      IsAllDay: false,
    })
  })

  const latestEvent = convertedData.reduce(
    (acc, val) =>
      acc.formatTime > val.formatTime ? acc.formatTime : val.formatTime,
    0
  )

  return (
    <div className={schedulerTheme}>
      <Box m={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CRYPTO CURRENCIES"
            subtitle="All informations related to currencies"
          />
        </Box>
        <Box mb={3}>
          <SearchSelect
            search={search}
            optionValue={coins}
            onSearchChange={setSearch}
          />
        </Box>
        {latestEvent ? (
          <Box className="schedule-control-section">
            <div className="control-section">
              <div className="control-wrapper">
                <ScheduleComponent
                  width="100%"
                  height="650px"
                  currentView="Month"
                  selectedDate={new Date(latestEvent)}
                  eventSettings={{ dataSource: convertedData }}
                  readonly={true}
                >
                  <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
              </div>
            </div>
          </Box>
        ) : (
          <AlertMessage type="info">No event found</AlertMessage>
        )}
      </Box>
    </div>
  )
}

export default CryptoEvents
