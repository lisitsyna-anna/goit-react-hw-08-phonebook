import { useState } from 'react';
import { useAuth } from 'hooks';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/authOperations';
import { Box, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { StyledButton, StyledNavLink } from './UserMenu.styled';
import { NavLink } from 'react-router-dom';
import { AddModal } from 'components/AddModal/AddModal';

export const UserMenu = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleLogout = () => dispatch(logOut());

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <StyledNavLink variant="h6" component={NavLink} to="/contacts">
          Contacts
        </StyledNavLink>
        <StyledButton variant="h6" component="button" onClick={handleOpenModal}>
          <Typography
            variant="h6"
            component="p"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Add contact
          </Typography>
        </StyledButton>

        <IconButton
          sx={{
            color: 'inherit',
            display: { xs: 'flex', sm: 'none' },
          }}
          onClick={handleOpenModal}
        >
          <PersonAddAlt1Icon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Typography
          variant="h6"
          component="p"
          sx={{ display: { xs: 'none', md: 'inline-block' } }}
        >
          Welcome, {user.name}!
        </Typography>

        <StyledButton variant="h6" component="button" onClick={handleLogout}>
          <Typography
            variant="h6"
            component="p"
            sx={{ display: { xs: 'none', md: 'inline-block' } }}
          >
            Logout
          </Typography>
          <LogoutIcon />
        </StyledButton>
      </Box>
      <AddModal isOpen={isOpen} handleClose={handleCloseModal} />
    </Box>
  );
};
