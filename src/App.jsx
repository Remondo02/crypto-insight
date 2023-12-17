import { Routes, Route } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ColorModeContext, useMode } from "./theme.js"
import { useCheckNavigation } from "./hooks/useCheckNavigation.js"
import { useMediaQuery } from "./hooks/useMediaQuery.js"
import {
  CryptoCurrencies,
  CryptoDetails,
  CryptoEvents,
  CryptoNews,
  Dashboard,
  Exchanges,
} from "./pages"
import { ThemeButton, Topbar, Sidebar } from "./components"

function App() {
  const [theme, colorMode] = useMode()
  const isMobile = useMediaQuery()
  const { page } = useCheckNavigation()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isMobile ? <Topbar /> : <Sidebar page={page} />}
          <main>
            {!isMobile && <ThemeButton />}
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/cryptocurrencies"
                  element={<CryptoCurrencies />}
                />
                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route path="/news" element={<CryptoNews />} />
                <Route path="/events" element={<CryptoEvents />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
