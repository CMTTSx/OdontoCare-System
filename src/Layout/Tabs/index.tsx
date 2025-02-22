import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import AtendimentoModal from '../AdicionarAtendimentoModal';
import ServiceBar from '../ServiceBar';
import Dummybar from '../ServiceBar/DummyBar';
import Dummybar2 from '../ServiceBar/DummyBar2';
import Dummybar3 from '../ServiceBar/DummyBar3';
import Dummybar4 from '../ServiceBar/DummyBar4';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

//Configurar TOPTAB ATENDIMENTO || FINALIZADO || TODOS
const TabsConfig = {

  '@media (min-width: 320px) ': {
  },
  '@media (min-width: 375px) ': {
    ml: '2rem',
  },
  '@media (min-width: 425px) ': {
    ml: '3rem',
  },
  '@media (min-width: 768px) ': {
    ml: '11rem',
  },
  '@media (min-width: 1024px) ': {
    ml: '47%',
  },
  '@media (min-width: 1440px) ': {
    ml: '60%',
  },
  '@media (min-width: 2560px) ': {
    ml: '75%',
  },
  '@media (min-width: 3440px) ': {
    ml: '82%',
  }

}

//Alinhar as TABS
const BoxConfig = {
  mt: 10,
  mb: 10,
  zIndex: 1,

  '@media (min-width: 320px) ': {
    ml: '2.4em',
  },
  '@media (min-width: 375px) ': {
    ml: 4,
  },
  '@media (min-width: 425px) ': {
    ml: 3,
  },
  '@media (min-width: 768px) ': {
    ml: 8,
    width: '77%',
  },
  '@media (min-width: 1024px) ': {
    ml: 13,
    width: '70%',
  },
  '@media (min-width: 1440px) ': {
    ml: 18,
  },
  '@media (min-width: 2560px) ': {
    ml: 21,
    mt: 10,
    width: '75%',
  },

}

// Button Adicionar Atendimento
const ButtonConfig = {

  '@media (min-width: 320px) ': {
    mt: '1rem',
    ml: '0%',
  },
  '@media (min-width: 375px) ': {
    ml: '1.3rem',
  },
  '@media (min-width: 425px) ': {
    ml: '18%',
  },
  '@media (min-width: 768px) ': {
    ml: '8rem',
  },
  '@media (min-width: 1024px) ': {
    ml: '11rem',
  },
  '@media (min-width: 1440px) ': {
    ml: '37.5%',
  },

  '@media (min-width: 2560px) ': {
    ml: '43.5%',
    width: '13%'

  },

}

// Atendimento
const Tab1Config = {
  ml: 55,

  '@media (min-width: 320px) ': {
    ml: '5%',
  },

  '@media (min-width: 1920px) ': {
    ml: '26%',
  },

}

//Finalizados
const Tab2Config = {

  '@media (min-width: 320px) ': {
    visibility: 'hidden'
  },
  '@media (min-width: 599px) ': {
    visibility: 'visible'
  },
}

//Todos
const Tab3Config = {

  '@media (min-width: 320px) ': {
    ml: -16,
  },
  '@media (min-width: 375px) ': {
    ml: -14,
  },
  '@media (min-width: 425px) ': {
    ml: -12,
  },
  '@media (min-width: 768px) ': {
    ml: 0,
  },
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={BoxConfig}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} sx={TabsConfig}>
          <Tab label="Atendimentos" {...a11yProps(0)} sx={Tab1Config} />
          <Tab label="Finalizado" {...a11yProps(1)} sx={Tab2Config} />
          <Tab label="Todos" {...a11yProps(2)} sx={Tab3Config} />
        </Tabs>
      </Box>
      {/*Tabs 1*/}
      <TabPanel value={value} index={0}>
        <Box>
          <ServiceBar />
          <Dummybar />
        </Box>
        <Button sx={ButtonConfig}><AtendimentoModal /></Button>
        <Box sx={{ textAlign: 'center', color: 'red', pt: 23, }}>
          VERSÃO DEMONSTRATIVA
        </Box>
      </TabPanel>
      {/*Tabs 2*/}
      <TabPanel value={value} index={1}>
        <Box sx={{
          mt: 1,
        }}>
        </Box>

        <Box sx={{
          mt: 1,
        }}>
        </Box>
      </TabPanel>
      {/*Tabs 3*/}
      <TabPanel value={value} index={2}>
        <Box sx={{
        }}>
          <Box sx={{
          }}>
            <ServiceBar />
          </Box>
          <Dummybar />
        </Box>

        <Box sx={{
          mt: 1
        }}>
          <Dummybar2 />
        </Box>

        <Box sx={{
          mt: 1
        }}>
          <Dummybar3 />
        </Box>

        <Box sx={{
          mt: 1
        }}>
          <Dummybar4 />
        </Box>

      </TabPanel>
    </Box>
  );
}