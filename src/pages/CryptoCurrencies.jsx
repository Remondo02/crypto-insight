import { Box } from "@mui/material"
import { Header } from "../components/Header.jsx"

export function CryptoCurrencies() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CRYPTO CURRENCIES"
          subtitle="All informations related to currencies"
        />
      </Box>
    </Box>
  )
}
