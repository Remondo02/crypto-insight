import { Box, Typography, useTheme } from "@mui/material"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js"
import { tokens } from "@/theme"
import { useChartJsData, useChartJsSettings } from "@/hooks"

import { type CryptoHistoryApiResponse } from "@/apis"

type LineChartProps = {
  coinHistory: CryptoHistoryApiResponse
  currentPrice: string
  coinName: string
}

export default function LineChart({
  coinHistory,
  currentPrice,
  coinName,
}: LineChartProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { options, plugins } = useChartJsSettings()
  const data = useChartJsData(coinHistory)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
  )
  ChartJS.defaults.color = colors.grey[300]

  return (
    <Box mb={7}>
      <Box>
        <Box marginBottom={2} alignItems="center">
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h3"
            color={colors.greenAccent[500]}
            mb={1}
          >
            {coinName} Price Chart
          </Typography>
          <Box display="flex" gap={2}>
            <Typography
              variant="h5"
              component="h4"
              color={colors.grey[100]}
              sx={{ fontWeight: "bold" }}
            >
              {coinHistory?.data?.change}%
            </Typography>
            <Typography
              variant="h5"
              component="h4"
              color={colors.grey[100]}
              sx={{ fontWeight: "bold" }}
            >
              Current {coinName} Price: $ {currentPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Line data={data} options={options} plugins={plugins} />
    </Box>
  )
}
