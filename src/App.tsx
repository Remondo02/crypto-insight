import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ColorModeContext, useMode } from "./theme"
import {
  CryptoCurrencies,
  CryptoDetails,
  CryptoEvents,
  CryptoNews,
  Dashboard,
  ErrorPage,
  Exchanges,
} from "./pages"
import { MainContent } from "./components"
import { PropsWithChildren } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Root>
        <ErrorPage />
      </Root>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/cryptocurrencies", element: <CryptoCurrencies /> },
      { path: "/crypto/:coinId", element: <CryptoDetails /> },
      { path: "/exchanges", element: <Exchanges /> },
      { path: "/news", element: <CryptoNews /> },
      { path: "/events", element: <CryptoEvents /> },
    ],
  },
])

function Root({ children }: PropsWithChildren) {
  const [theme, colorMode] = useMode()
  const contentStyles = children !== undefined ? "content-error" : "content"

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainContent wrapper={contentStyles}>
          <Outlet />
          {children}
        </MainContent>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

function App() {
  return <RouterProvider router={router} />
}

export default App
