import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

import AgendamentoPopover from '../Layout/AgendamentoPopover';
import AgendarHorario from '../Layout/AgendarAtendimentoModal';
import Breadcrumbs from '../Layout/Breadcrumbs/Agenda';
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';

const BoxConfig = {
  backgroundColor: '#F6F4F4',
  height: '50rem',

  '@media (min-width: 2560px) ': {
    height: '100rem'
  },
}

const ContentConfig = {

  '@media (min-width: 320px) ': {
    ml: '15%',
    mr: 'auto',
    mt: 0,
    width: '84%',
    textAlign: 'center',
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  '@media (min-width: 375px) ': {
    ml: '13%',
  },
  '@media (min-width: 425px) ': {
    ml: '11%',
  },
  '@media (min-width: 768px) ': {
    ml: '5%',
  },
  '@media (min-width: 1024px) ': {
    ml: '5%',
  },
  '@media (min-width: 1440px) ': {
    ml: '3%',
  },
}

const BoardConfig = {
  mt: 3,
  mb: 1,
  ml: 'auto',
  mr: 'auto',
  border: 1,
  backgroundColor: '#fff',
  borderColor: '#cfcfcf',
  width: '60em',
  height: '50rem',

  '@media (min-width: 320px) ': {
    width: '100%',
    height: '40px',
  },
  '@media (min-width: 768px) ': {
    width: '90%',
    height: '40px',
  },
  '@media (min-width: 1440px) ': {
    width: '50em',
    height: '40px',
  },

}

const TypoAgendamento = {
  mt: 2,
  mx: 'auto',
  fontSize: 35,
  fontWeight: 600,

  '@media (min-width: 320px) ': {
    fontSize: 18,
  },
  '@media (min-width: 1024px) ': {
    fontSize: 30,
    textAlign: 'center',
  },
}

const TypoName = {
  mt: -5,
  mb: 1.6,
  fontSize: 22,
  fontWeight: 600,
  color: '#000000',

  '@media (min-width: 320px) ': {
    ml: 3,
    mt: -1.7,
    fontSize: 13,
  },
  '@media (min-width: 768px) ': {
    ml: -45,
    mt: -2.45,
    fontSize: 13,
  },
  '@media (min-width: 1024px) ': {
    ml: -45,
    mt: -1.7,
    fontSize: 14,
  },
  '@media (min-width: 1440px) ': {
    ml: -40,
    mt: -1.8,
    fontSize: 18,
  },
  '@media (min-width: 1920px) ': {
    ml: -40,
    mt: -2.1,
    fontSize: 19,
  },

}

const TypoAgendado = {
  zIndex: 1,
  ml: -90,
  mt: 2,
  fontWeight: 600,
  color: '#0053d9',

  '@media (min-width: 320px) ': {
    ml: -21,
    mt: 2.9,
    fontSize: 12,
  },
  '@media (min-width: 375px) ': {
    ml: -25,
    fontSize: 12,
  },
  '@media (min-width: 768px) ': {
    ml: 30,
    mt: 1.8,
    fontSize: 12,
  },
  '@media (min-width: 1024px) ': {
    ml: -75,
    mt: 2.5,
    fontSize: 12,
  },
  '@media (min-width: 1440px) ': {
    ml: -84.8,
    fontSize: 12,
  },
  '@media (min-width: 1920px) ': {
    ml: -76,
    mt: 3,
    fontSize: 13,
  },
  '@media (min-width: 3440px) ': {
    ml: -85,
    mt: 2.5,
    fontSize: 13,
  },
}

const TypoHour = {
  zIndex: 1,
  ml: -90.5,
  mt: -0.6,
  fontSize: 16,
  fontWeight: 600,

  '@media (min-width: 320px) ': {
    ml: -21,
    mt: -4.5,
    fontSize: 12.5,
  },
  '@media (min-width: 375px) ': {
    ml: -25.5,
  },
  '@media (min-width: 768px) ': {
    ml: 0,
    mt: -2.2,
  },
  '@media (min-width: 1024px) ': {
    ml: -75,
    mt: -3.8,
  },
  '@media (min-width: 1440px) ': {
    ml: -85,
    mt: -3.8,
  },
  '@media (min-width: 1920px) ': {
    ml: -76,
    mt: -4.3,
    fontSize: 14,
  },
  '@media (min-width: 3440px) ': {
    ml: -85,
    mt: -4.3,
    fontSize: 14,
  },

}

const PopoverConfig = {
  ml: 95,
  mt: -5.5,

  '@media (min-width: 320px) ': {
    ml: 23,
    mt: -5,
  },
  '@media (min-width: 375px) ': {
    ml: 28,
  },
  '@media (min-width: 425px) ': {
    ml: 32,
    mt: -5.2,
  },
  '@media (min-width: 768px) ': {
    ml: 54,
    mt: -5,
  },
  '@media(min-width: 1024px) ': {
    ml: 75,
    mt: -5.1,
  },
  '@media (min-width: 1440px) ': {
    ml: 88,
    mt: -6,
  },
  '@media (min-width: 1920px) ': {
    ml: 80,
  },
  '@media (min-width: 3440px) ': {
    ml: 90,
  },
}

const ButtonConfig = {
  mt: 5,
  ml: 0,
}

export default function Agenda() {

  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  const dataAtual = mes + '/' + dia + '/' + ano;

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(dataAtual),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <Box sx={BoxConfig}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={20} >
          <Navbar />
          <Breadcrumbs />
        </Grid>
        <Grid item xs={1} sx={{ zIndex: 1000, }}>
          <Sidebar />
        </Grid>
        <Grid item xs={11}>
          <Box sx={ContentConfig}>

            <Typography sx={TypoAgendamento}>
              Agendamento
            </Typography>

            <Box sx={{ display: 'flex', mx: 'auto', mt: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} width={'11rem'} >
                  <DesktopDatePicker
                    label="Data de atendimento"
                    inputFormat="DD/MM/YY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  ></DesktopDatePicker>
                </Stack>
              </LocalizationProvider>

            </Box>
            <Box
              sx={BoardConfig}>

              <Typography
                sx={TypoAgendado}
              >Agendado</Typography>

              <Typography
                sx={TypoHour}
              >11:00Hrs</Typography>

              <Typography
                sx={TypoName}
              >Julia Silva Machado
              </Typography>

              <Box sx={PopoverConfig}><AgendamentoPopover /></Box>

            </Box>
            <Button sx={ButtonConfig}>
              <AgendarHorario />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', color: 'red', fontStyle: 'bold', width: 1, pt: 10, }}>
          VERSÃO DEMONSTRATIVA
      </Box>
    </Box>
  );
}
