import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useId } from "react"

export function SearchSelect({
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