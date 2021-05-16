import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import Progress from '../components/Progress';
import { selectProducts } from '../store/productsSlice';
import { getProducts } from './../store/productsSlice';
import { Alert } from '@material-ui/lab';

const HomePage: React.FC = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  return (
    <Layout>
      {products.loading && <Progress loading={products.loading} />}
      {products.error && <Alert severity="error">{products.error}</Alert>}
    </Layout>
  )
}

export default HomePage
