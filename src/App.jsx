import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ColorModeContext, useMode } from "./theme.js"
import {
  CryptoCurrencies,
  CryptoDetails,
  CryptoEvents,
  CryptoNews,
  Dashboard,
  ErrorPage,
  Exchanges,
} from "./pages"
import { ThemeButton, Topbar, Sidebar } from "./components"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root children={<ErrorPage />} />,
    children: [
      {
        errorElement: <Root children={<ErrorPage />} />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "/cryptocurrencies", element: <CryptoCurrencies /> },
          { path: "/crypto/:coinId", element: <CryptoDetails /> },
          { path: "/exchanges", element: <Exchanges /> },
          { path: "/news", element: <CryptoNews /> },
          { path: "/events", element: <CryptoEvents /> },
        ],
      },
    ],
  },
])

function Root({ children }) {
  const [theme, colorMode] = useMode()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const contentStyles = children !== undefined ? "content-error" : "content"

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isMobile ? <Topbar /> : <Sidebar />}
          <main>
            {!isMobile && <ThemeButton />}
            <div className={contentStyles}>
              <Outlet />
              {children}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

function App() {
  return <RouterProvider router={router} />
}

export default App
