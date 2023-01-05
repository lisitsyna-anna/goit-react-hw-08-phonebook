import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const styledNavLink = {
  textDecoration: 'none',
  color: 'inherit',
  padding: '2px 4px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  '&:hover': {
    color: 'primary.main',
    backgroundColor: '#fff',
  },

  '&.active': {
    color: 'primary.main',
    backgroundColor: '#fff',
  },
};

export const AuthNav = () => {
  return (
    <Box display="flex" gap={2}>
      <Typography
        variant="h6"
        component={NavLink}
        to="/register"
        sx={styledNavLink}
      >
        Register
        <AppRegistrationIcon />
      </Typography>

      <Typography
        variant="h6"
        component={NavLink}
        to="/login"
        sx={styledNavLink}
      >
        Log in
        <LoginIcon />
      </Typography>
    </Box>
  );
};
