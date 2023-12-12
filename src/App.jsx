import { ColorModeContext, useMode } from "./theme.js"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import { ThemeButton } from "./components/ThemeButton.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { CryptoCurrencies } from "./pages/CryptoCurrencies.jsx"
import { CryptoNews } from "./pages/CryptoNews.jsx"
import { Exchanges } from "./pages/Exchanges.jsx"
import { CryptoEvents } from "./pages/CryptoEvents.jsx"
import { CryptoDetails } from "./pages/CryptoDetails.jsx"
import { useCheckNavigation } from "./hooks/useCheckNavigation.js"
import { useMediaQuery } from "./hooks/useMediaQuery.js"
import { Topbar } from "./components/Topbar.jsx"
import { Sidebar } from "./components/Sidebar.jsx"

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
          <main className="content">
            {!isMobile && <ThemeButton />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/news" element={<CryptoNews />} />
              <Route path="/events" element={<CryptoEvents />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
