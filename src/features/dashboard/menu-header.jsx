import * as React from 'react';
import { Box, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';

const YEAR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const CURRENT_MONTH = format(new Date(), 'MMMM');

export const MenuHeader = () => {
  const [month, setMonth] = React.useState(CURRENT_MONTH);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Mês</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={month}
        label="Age"
        onChange={handleMonthChange}
      >
        {YEAR_MONTHS.map((month) => 
          <MenuItem key={month} value={month}>{month}</MenuItem>
        )}
      </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Button variant="contained" color="success" endIcon={<AddIcon />}>Incluir</Button>
    </FormControl>
  </Box>)
}