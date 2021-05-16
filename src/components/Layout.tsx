import { Box, Container, CssBaseline } from '@material-ui/core';
import React from 'react';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box position='relative' width='100%' overflow='hidden'>
      <CssBaseline />
      <Header />

      <main>
        <Container maxWidth='md'>
          <>{children}</>
        </Container>
      </main>
    </Box>
  );
};

export default Layout;
