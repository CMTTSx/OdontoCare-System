import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import * as React from 'react';


export default function MaterialUIPickers() {

  //Data Dinâmica
  const nowDate = dayjs();


  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(nowDate),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="pt-br"
    >
      <Stack spacing={3}>
        <MobileDatePicker
          label="Agendar Data"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Agendar Hora"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}