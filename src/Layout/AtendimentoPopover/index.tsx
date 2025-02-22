import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';


const BoxConfig = {

  '@media (min-width: 320px)': {
    ml: '70%',
    mt: -8,
  },

  '@media (min-width: 425px)': {
    ml: '80%',
    mt: -8.5,
  },
  '@media (min-width: 768px)': {
    ml: '87%',
    mt: -3.7,
  },
  '@media (min-width: 1024px)': {
    ml: '88%',
    mt: -3.5,
  },
  '@media (min-width: 1440px)': {
    ml: '90%',
    mt: -3.5,
  },
  '@media (min-width: 2560px)': {
    ml: '95%',
    mt: -3.5,
  },
  '@media (min-width: 3440px)': {
    ml: '97%',
    mt: -3.5,
  },

}

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={BoxConfig}>
      <Button 
      onClick={handleClick}>
        <BsThreeDotsVertical size={'1.5em'} color={"#000000"} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Button sx={{
        fontWeight: 600,
        color: '#000000',
        textAlign: 'justify',
       }}>Editar Atendimento</Button>
       <Button sx={{
        fontWeight: 600,
        color: '#cf0700',
       }}>Cancelar Atendimento</Button>
        </Box>


      </Popover>
    </Box>
  );
}
