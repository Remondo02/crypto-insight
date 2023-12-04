import { ColorModeContext, useMode } from "./theme.js"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import { ThemeButton } from "./global/ThemeButton.jsx"
import { Sidebar } from "./global/Sidebar.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { CryptoCurrencies } from "./pages/CryptoCurrencies.jsx"
import { CryptoNews } from "./pages/CryptoNews.jsx"
import { Exchanges } from "./pages/Exchanges.jsx"
import { CryptoEvents } from "./pages/CryptoEvents.jsx"

function App() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <ThemeButton />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
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
