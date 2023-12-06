import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useId } from "react"

export function SearchSelect({ search, optionValue, onSearchChange }) {
  const id = useId()

  return (
    <Box sx={{ minWidth: 120, width: 'max-content' }}>
      <FormControl fullWidth>
        <InputLabel id={id}>Cryptocurrency</InputLabel>
        <Select
          labelId={id}
          id="demo-simple-select"
          value={search}
          label="Cryptocurrency"
          onChange={(e) => onSearchChange(e.target.value)}
        >
          {optionValue.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
