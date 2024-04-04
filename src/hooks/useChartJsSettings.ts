import { useTheme } from "@mui/material"
import { tokens } from "@/theme"
import { Chart } from "chart.js"

export function useChartJsSettings() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const plugin = {
    id: "custom_canvas_background_color",
    beforeDraw: (chartJS: Chart, args: { cancelable: true }, options?: any) => {
      const { ctx } = chartJS
      ctx.save()
      args.cancelable
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
