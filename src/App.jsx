import { ColorModeContext, useMode } from "./theme.js"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import { Topbar } from "./global/Topbar.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"

function App() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
