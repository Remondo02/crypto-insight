import { useId } from "react"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function SearchSelect({
  inputLabel,
  search,
  optionValue,
  onSearchChange,
}) {
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
              return MenuItemType(option, option)
            }
            if (option.hasOwnProperty("id")) {
              return MenuItemType(option.id, option.name)
            }
            if (option.hasOwnProperty("uuid")) {
              return MenuItemType(option.name, option.name)
            }
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

function MenuItemType(optionKeyValue, optionName) {
  return (
    <MenuItem key={optionKeyValue} value={optionKeyValue}>
      {optionName}
    </MenuItem>
  )
}
