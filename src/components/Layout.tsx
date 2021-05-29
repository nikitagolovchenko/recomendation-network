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

      <Box component='main' pb={5}>
        <Container maxWidth={container}>
          <>{children}</>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
