import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import Progress from '../components/Progress';
import { selectProducts } from '../store/productsSlice';
import { Alert } from '@material-ui/lab';
import { Box, Theme } from '@material-ui/core';
import MediaCard from '../components/MediaCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
    marginLeft: `${-theme.spacing(1)}px`,
    marginRight: `${-theme.spacing(1)}px`,
  },
  cardItem: {
    width: '33.33333%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const HomePage: React.FC = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  return (
    <Layout>
      <Box className={classes.cardList}>
        {products.products.map(el => (
          <Box className={classes.cardItem} key={String(el.id)}>
            <MediaCard {...el} />
          </Box>
        ))}
      </Box>

      {products.loading && <Progress loading={products.loading} />}
      {products.error && <Alert severity='error'>{products.error}</Alert>}
    </Layout>
  );
};

export default HomePage;
