import { useTheme } from "@mui/material"
import { tokens } from "@/theme"
import { type CryptoHistoryApiResponse } from "@/apis"

export function useChartJsData(coinHistory: CryptoHistoryApiResponse) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price)
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    )
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        color: colors.grey[100],
        borderColor: colors.greenAccent[500],
        backgroundColor: colors.greenAccent[500],
      },
    ],
  }

  return data
}