import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from 'components/Header';
import { Suspense } from 'react';
import { Container, Typography, Link } from '@mui/material';
import { FadeLoader } from 'react-spinners';

export const Layout = () => {
  return (
    <div
      className="mainContainer"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <Suspense
        fallback={
          <FadeLoader
            color="#1976d2"
            cssOverride={{
              display: 'block',
              margin: '0 auto',
            }}
          />
        }
      >
        <main>
          <Container
            style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px' }}
          >
            <Outlet />
          </Container>
        </main>
        <footer
          style={{
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '25px 0',
            marginTop: 'auto',
          }}
        >
          <Container
            style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px' }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/lisitsyna-anna">
                Created by Anna Lisitsyna
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container>
        </footer>
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
