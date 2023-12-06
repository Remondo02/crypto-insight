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

import { useGetCryptoEventsApiQuery } from "../services/cryptoEventsApi.js"
import { DescriptionAlerts } from "../components/DescriptionAlerts.jsx"
import { Box, useTheme } from "@mui/material"
import { Header } from "../components/Header.jsx"

export function CryptoEvents() {
  const theme = useTheme()
  const {
    data: cryptoEvents,
    error,
    isLoading,
    isFetching,
  } = useGetCryptoEventsApiQuery({
    coinId: "btc-bitcoin",
  })

  if (isLoading || isFetching) {
    return "...loading"
  }

  if (error) {
    return <DescriptionAlerts type="error" error={error} />
  }

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

  const latestEvent = convertedData.reduce((acc, val) =>
    acc.formatTime > val.formatTime ? acc.formatTime : val.formatTime
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
      </Box>
    </div>
  )
}

export default CryptoEvents
