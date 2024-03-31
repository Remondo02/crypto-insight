import { useState } from "react"
import { Box, Grid } from "@mui/material"
import {
  useGetCryptoEventsApiQuery,
  useGetCryptoEventsCoinsApiQuery,
} from "../services/cryptoEventsApi.js"
import {
  AlertMessage,
  Calendar,
  Header,
  Loader,
  EventsList,
  SearchSelect,
} from "@/components"
import { eventsData, getCoins } from "@/utils"

export default function CryptoEvents() {
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

  let errors = []

  if (cryptoCoinsError) {
    errors = [...errors, cryptoCoinsError]
  }
  if (cryptoEventsError) {
    errors = [...errors, cryptoEventsError]
  }

  return (
    <Box height="inherit">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CRYPTO EVENTS"
          subtitle="List of events related to a specific cryptocurrency"
        />
      </Box>
      {(isLoadingCoins || isLoadingEvents) && <Loader />}
      <Box display="flex" flexDirection="column" gap={2}>
        {errors.length > 0 &&
          errors.map((error, i) => (
            <AlertMessage key={i} type="error" error={error} />
          ))}
      </Box>
      {cryptoCoins && cryptoEvents && (
        <Box height={isFetchingEvents ? "inherit" : ""}>
          <Box mb={3}>
            <SearchSelect
              inputLabel="Select a Crypto"
              search={search}
              optionValue={getCoins({ cryptoCoins })}
              onSearchChange={setSearch}
            />
          </Box>
          {isFetchingEvents ? (
            <Loader />
          ) : eventsData({ cryptoEvents }).data.length > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 7, md: 3 }}
                columns={{ xs: 4, sm: 4, md: 8, lg: 12, xl: 16 }}
              >
                <EventsList events={eventsData({ cryptoEvents })} />
                <Calendar events={eventsData({ cryptoEvents })} />
              </Grid>
            </Box>
          ) : (
            <AlertMessage type="info" error={"No event found"} />
          )}
        </Box>
      )}
    </Box>
  )
}
