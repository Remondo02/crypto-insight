import { Box } from "@mui/material"
import { Header } from "../components/Header.jsx"

export function Exchanges() {
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>
      <Header title="EXCHANGES" subtitle="Exchanges" />
    </Box>
  )
}