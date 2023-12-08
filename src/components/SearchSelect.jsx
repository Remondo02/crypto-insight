import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useId } from "react"

export function SearchSelect({ inputLabel, search, optionValue, onSearchChange }) {
  const id = useId()

  return (
    <Box sx={{ minWidth: 120, width: 'max-content' }}>
      <FormControl fullWidth>
        <InputLabel id={id}>{inputLabel}</InputLabel>
        <Select
          labelId={id}
          id="demo-simple-select"
          value={search}
          label={inputLabel}
          onChange={(e) => onSearchChange(e.target.value)}
        >
          {optionValue.map((option) => (
            <MenuItem key={option.id ?? option} value={option.id ?? option}>
              {option.name ?? option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
