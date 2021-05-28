import { Box, Container, CssBaseline } from '@material-ui/core';
import React from 'react';
import Header from './Header';

interface LayoutProps {
  container?: 'sm' | 'md' | 'lg';
}

const Layout: React.FC<LayoutProps> = ({ children, container = 'md' }) => {
  return (
    <Box position='relative' width='100%' overflow='hidden'>
      <CssBaseline />
      <Header />

      <main>
        <Container maxWidth={container}>
          <>{children}</>
        </Container>
      </main>
    </Box>
  );
};

export default Layout;
