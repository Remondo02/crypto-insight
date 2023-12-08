import { Box, Typography, useTheme } from "@mui/material"
import React from "react"
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
import { Line } from "react-chartjs-2"
import { tokens } from "../theme.js"
import { AspectRatio } from "@mui/icons-material"

export function LineChart({ coinHistory, currentPrice, coinName }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const coinPrice = []
  const coinTimestamp = []
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

  const options = {
    // responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
  }

  return (
    <Box mb={3}>
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
              color={colors.grey[100]}
              sx={{ fontWeight: "bold" }}
            >
              {coinHistory?.data?.change}%
            </Typography>
            <Typography
              variant="h5"
              color={colors.grey[100]}
              sx={{ fontWeight: "bold" }}
            >
              Current {coinName} Price: $ {currentPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Box sx={{aspectRatio: "16/9", maxWidth:"calc(100% - 1px)"}}> */}
        <Line data={data} options={options} />
      {/* </Box> */}
    </Box>
  )
}

export default LineChart
