import { Helmet } from 'react-helmet-async';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from 'hooks';

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #1976d2;

  &:hover,
  &:focus {
    color: #9c27b0;
  }
`;

const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Helmet>
        <title>MyPnonebook</title>
      </Helmet>
      <Typography component="h1" variant="h3">
        Welcome to your Phonebook
      </Typography>
      {!isLoggedIn && (
        <Typography component="p" variant="h6">
          You can <StyledLink to="/register">register</StyledLink> or{' '}
          <StyledLink to="/login">login</StyledLink> if you already have an
          account. You will be able to add a list of contacts, which you can
          edit, delete or filter.
        </Typography>
      )}

      {isLoggedIn && (
        <Typography component="p" variant="h6">
          You are already logged in! Go to{' '}
          <StyledLink to="/contacts">contacts</StyledLink> to add new friends!
        </Typography>
      )}
    </Box>
  );
};

export default Home;
