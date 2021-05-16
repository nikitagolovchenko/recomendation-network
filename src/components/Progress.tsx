import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

interface ProgressProps {
  loading: boolean;
}

const Progress: React.FC<ProgressProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <Box display='flex' justifyContent='center' mb={2}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Progress;
