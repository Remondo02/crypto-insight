import { Box } from "@mui/material"
import { Header } from "../components/Header.jsx"

export function CryptoNews({ simplified }) {
  return (
    <>
      {!simplified && (
        <Box m={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="CRYPTO NEWS" subtitle="All news" />
          </Box>
        </Box>
      )}
    </>
  )
}
