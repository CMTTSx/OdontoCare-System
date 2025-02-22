import { Grid, } from '@mui/material';
import Box from '@mui/material/Box';

import Breadcrumbs from '../Layout/Breadcrumbs/Home';
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';
import Tabs from '../Layout/Tabs';
import TopBar from '../Layout/Topbar';

const BoxConfig = {
  backgroundColor: '#F6F4F4',

  '@media (min-width: 320px) ': {
    height: '60rem',
  },
  '@media (min-width: 2560px) ': {
    height: '100rem'
  },

}

export default function Home() {
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
          <TopBar />
          <Tabs />
        </Grid>

      </Grid>

    </Box>
  );
}
