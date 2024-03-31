import { useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function ChartJsData({ coinHistory }) {
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

export function ChartJsSettings() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const plugin = {
    id: "custom_canvas_background_color",
    beforeDraw: (chartJS, args, options) => {
      const { ctx } = chartJS
      ctx.save()
      ctx.globalCompositeOperation = "destination-over"
      ctx.fillStyle = options.color
      ctx.fillRect(0, 0, chartJS.width, chartJS.height)
      ctx.restore()
    },
  }

  const options = {
    responsive: true,
    layout: {
      padding: 24,
    },
    plugins: {
      custom_canvas_background_color: {
        color: colors.primary[400],
      },
    },
  }

  const plugins = [plugin]

  return { options, plugins }
}
