import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks';
import { refreshUser } from 'redux/auth/authOperations';
import { FadeLoader } from 'react-spinners';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Layout } from 'components/Layout';
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { CssBaseline } from '@mui/material/';
import { selectThemeDarkMode } from 'redux/theme/themeSelectors';

const HomePage = lazy(() => import('pages/Home'));
const RegisterPage = lazy(() => import('pages/Register'));
const LoginPage = lazy(() => import('pages/Login'));
const ContactsPage = lazy(() => import('pages/Contacts'));

export const App = () => {
  const [mode, setMode] = useState('light');

  const darkMode = useSelector(selectThemeDarkMode);

  useEffect(() => {
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isRefreshing ? (
        <FadeLoader
          color="#1976d2"
          cssOverride={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={RegisterPage}
                  redirectTo={'/contacts'}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={LoginPage}
                  redirectTo={'/contacts'}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute component={ContactsPage} redirectTo={'/login'} />
              }
            />
          </Route>
        </Routes>
      )}
      ;
    </ThemeProvider>
  );
};
