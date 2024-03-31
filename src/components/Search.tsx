import { Box, InputBase, IconButton, useTheme } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { tokens } from "@/theme"

export default function Search({ search, onSearchChange }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box
      marginBottom={3}
      display="inline-block"
      backgroundColor={colors.primary[400]}
      borderRadius="3px"
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      ></InputBase>
      <IconButton type="button" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  )
}
