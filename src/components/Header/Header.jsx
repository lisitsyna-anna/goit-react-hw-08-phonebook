import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useAuth } from 'hooks';
import { AuthNav } from 'components/AuthNav';
import { UserMenu } from 'components/UserMemu';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { toggleTheme } from 'redux/theme/themeSlice';
import { useDispatch } from 'react-redux';

export const Header = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          maxWidth: 'xl',
        }}
      >
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: 600,
              textDecoration: 'none',
              flexGrow: 1,
              color: 'inherit',
              display: { xs: 'none', md: 'block' },
              width: '200px',
            }}
          >
            My phonebook
          </Typography>
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => dispatch(toggleTheme())}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};
