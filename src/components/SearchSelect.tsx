import { Dispatch, SetStateAction, useId } from "react"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

type SearchSelectProps = {
  inputLabel: string
  search: string
  optionValue: {
    id: string
    name: string
  }[]
  onSearchChange: Dispatch<SetStateAction<string>>
}

export default function SearchSelect({
  inputLabel,
  search,
  optionValue,
  onSearchChange,
}: SearchSelectProps) {
  const id = useId()

  return (
    <Box sx={{ minWidth: 120, width: "max-content" }}>
      <FormControl fullWidth>
        <InputLabel id={id}>{inputLabel}</InputLabel>
        <Select
          labelId={id}
          value={search}
          label={inputLabel}
          onChange={(e) => onSearchChange(e.target.value)}
        >
          {optionValue.map((option) => {
            if (typeof option === "string") {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            }
            if (option.hasOwnProperty("id")) {
              return (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )
            }
            if (option.hasOwnProperty("uuid")) {
              return (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              )
            }
          })}
        </Select>
      </FormControl>
    </Box>
  )
}