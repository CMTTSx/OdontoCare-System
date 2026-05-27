import { Box, Button, Popover } from '@mui/material';
import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button onClick={handleClick}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
          {/* Evita button dentro de button */}
          <Box
            component="button"
            onClick={() => { console.log('Editar'); handleClose(); }}
            style={{
              fontWeight: 600,
              color: '#000000',
              padding: '8px 16px',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b9b9b9ff')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Editar Usuário
          </Box>

          <Box
            component="button"
            onClick={() => { console.log('Deletar'); handleClose(); }}
            style={{
              fontWeight: 600,
              color: '#cf0700',
              padding: '8px 16px',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#db0b00'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#cf0700'; }}
          >
            Deletar Usuário
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
