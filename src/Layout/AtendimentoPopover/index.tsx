import * as React from 'react';
import { Box, Button, IconButton, Popover } from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function AgendamentoPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'agendamento-popover' : undefined;

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-describedby={id}
        size="small"
      >
        <BsThreeDotsVertical size="1.5em" color="#000000" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: { xs: 140, sm: 160, md: 180, lg: 200, xl: 220, '2xl': 250 },
          }}
        >
          <Button
            sx={{
              fontWeight: 600,
              color: '#000',
              justifyContent: 'flex-start',
              fontSize: { xs: 12, sm: 13, md: 14, lg: 15, xl: 16, '2xl': 17 },
              px: { xs: 1, sm: 2, md: 3 },
              py: { xs: 0.5, sm: 1 },
              '&:hover': { backgroundColor: '#b9b9b9', color: '#fff' },
            }}
            onClick={handleClose}
          >
            Editar Atendimento
          </Button>

          <Button
            sx={{
              fontWeight: 600,
              color: '#cf0700',
              justifyContent: 'flex-start',
              fontSize: { xs: 12, sm: 13, md: 14, lg: 15, xl: 16, '2xl': 17 },
              px: { xs: 1, sm: 2, md: 3 },
              py: { xs: 0.5, sm: 1 },
              '&:hover': { backgroundColor: '#db0b00', color: '#fff' },
            }}
            onClick={handleClose}
          >
            Cancelar Atendimento
          </Button>
        </Box>
      </Popover>
    </>
  );
}
