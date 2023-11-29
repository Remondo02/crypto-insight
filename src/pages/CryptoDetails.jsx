import { Box } from "@mui/material"
import { Header } from "../components/Header.jsx"

export function CryptoDetails() {
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>
      <Header title="CRYPTO DETAILS" subtitle="Informations related to a single currency" />
    </Box>
  )
}
