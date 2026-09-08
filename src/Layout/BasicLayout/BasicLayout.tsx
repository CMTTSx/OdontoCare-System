import React, { ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

interface BasicLayoutProps {
  children: ReactNode;
}

// Altura da Navbar (px)
const NAVBAR_HEIGHT = 64;

// Largura da Sidebar fixa
const SIDEBAR_WIDTH = 64;

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#F6F4F4' }}>

      {/* Navbar fixa no topo */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: NAVBAR_HEIGHT,
          zIndex: 1300, // acima da sidebar
        }}
      >
        <Navbar />
      </Box>

      {/* Sidebar fixa à esquerda, abaixo da Navbar */}
      <Box
        sx={{
          position: 'fixed',
          top: NAVBAR_HEIGHT,
          bottom: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          zIndex: 1200,
        }}
      >
        <Sidebar />
      </Box>

      {/* Conteúdo principal */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          ml: `${SIDEBAR_WIDTH}px`,
          mt: `${NAVBAR_HEIGHT}px`,
          px: {
            xs: 1,  // 320
            sm: 2,  // 375
            md: 3,  // 768/1024
            lg: 4,  // 1440
            xl: 5,  // 2560/3440
          },
          width: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>
      </Box>
    </>
  );
}
