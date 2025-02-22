import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';


const GerenciamentoPopoverConfig = {
  ml: '50rem',
  mt: -9,

  '@media (min-width: 1440px) ': {
    ml: '90%',
  },
  '@media (min-width: 1920px) ': {
    ml: '90%',
  },
  '@media (min-width: 2560px) ': {
    ml: '90%',
  },
  '@media (min-width: 3440px) ': {
    ml: '90%',
  }
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
    <div>
      <Button 
      sx={GerenciamentoPopoverConfig}
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
          flexDirection: 'column',
          
        }}>
          <Button sx={{
        fontWeight: 600,
        color: '#000000',
       }}>Editar Usuário</Button>
        <Button sx={{
        fontWeight: 600,
        color: '#cf0700',
       }}>Deletar Usuário</Button>
        </Box>

      </Popover>
    </div>
  );
}
