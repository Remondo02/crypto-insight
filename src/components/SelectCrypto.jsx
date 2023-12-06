import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export function SelectCrypto({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select a Crypto</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={"age"}
        placeholder="Select a Crypto"
        label="Select a Crypto"
        onChange={"handleChange"}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}

{
  /* <SelectCrypto value={newsCategory} onChange={handleChange} input={<OutlinedInput label="newsCategory" />} /> */
}
