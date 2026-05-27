import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { MdManageAccounts } from "react-icons/md";
import { Box } from '@mui/system';

const breadCrumbsContainerSx = {
  backgroundColor: '#fff',
  color: '#e8e8e8',
  width: {
    xs: '65%',
    sm: '80%',
    md: '60%',
    lg: '90%',
  },
  maxWidth: '100%',
  overflow: 'hidden',
  padding: '8px 12px',
  border: '1px solid #e8e8e8',
};

export default function BreadcrumbsRef() {
  return (
    <Box sx={breadCrumbsContainerSx}>
      <Breadcrumbs
        aria-label="breadcrumb"
        maxItems={2}
        itemsAfterCollapse={1}
        separator={<IoIosArrowForward size={14} />}
        sx={{
          flexWrap: 'wrap',
          overflow: 'hidden',
        }}
      >
        <Link
          component={RouterLink}
          to="/gerenciamento"
          underline="hover"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 0.5,
              flexShrink: 0,
            }}
          >
            <MdManageAccounts size={18} />
          </Box>

          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: 14,
            }}
          >
            Gerenciamento de Usuários
          </Typography>
        </Link>
      </Breadcrumbs>
    </Box>
  );
}
