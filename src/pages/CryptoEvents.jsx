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

export function CryptoEvents() {
  const theme = useTheme()
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
    const error = { ...cryptoCoinsError, ...cryptoEventsError }
    return (
      <AlertMessage type="error" errorMessage={error}>
       {error?.data?.message?.toString()}
      </AlertMessage>
    )
  }

  const coins = []

  cryptoCoins.map((coin, i) => {
    if (i < 1000) {
      coins.push({
        id: coin.id,
        name: coin.name,
      })
    }
  })

  const convertedData = []

  cryptoEvents.map((event) => {
    convertedData.push({
      id: event.id,
      Subject: event.name ?? event.description,
      StartTime: event.date,
      formatTime: new Date(event.date).getTime(),
      EndTime: event.date_to ?? event.date,
      IsAllDay: false,
    })
  })

  const latestEvent = convertedData.reduce(
    (acc, val) =>
      acc.formatTime > val.formatTime ? acc.formatTime : val.formatTime,
    0
  )

  const schedulerTheme = theme.palette.mode === "dark" ? "e-dark-mode" : ""

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
          <div className="schedule-control-section">
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
          </div>
        ) : (
          <AlertMessage type="warning">No event found</AlertMessage>
        )}
      </Box>
    </div>
  )
}

export default CryptoEvents
