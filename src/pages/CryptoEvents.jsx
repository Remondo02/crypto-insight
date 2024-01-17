import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Grid, List, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"
import {
  useGetCryptoEventsApiQuery,
  useGetCryptoEventsCoinsApiQuery,
} from "../services/cryptoEventsApi.js"
import {
  AlertMessage,
  Calendar,
  Header,
  Loader,
  ListEvents,
  SearchSelect,
} from "../components"
import converted from "../utils/conversion.js"
import getCoins from "../utils/coins.js"

export default function CryptoEvents() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
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
          ) : (
            <>
              {converted({ cryptoEvents }).data.length > 0 ? (
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
                          {converted({ cryptoEvents }).data.map((event) =>
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
                                <ListEvents key={event.id} event={event} />
                              </Link>
                            ) : (
                              <ListEvents key={event.id} event={event} />
                            )
                          )}
                        </List>
                      </Box>
                    </Grid>
                    <Calendar events={converted({ cryptoEvents })} />
                  </Grid>
                </Box>
              ) : (
                <AlertMessage type="info" error={"No event found"} />
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
