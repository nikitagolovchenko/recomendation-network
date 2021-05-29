import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { useAppSelector } from '../hooks/useRedux';
import { selectProducts } from '../store/productsSlice';
import { selectReviews } from '../store/reviewsSlice';
import ReviewsList from '../components/ReviewsList';
import { selectUsers } from '../store/usersSlice';
import CommentForm from '../components/CommentForm';
import { selectAuth } from '../store/authSlice';

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: `-${theme.spacing(3)}px`,
    marginRight: `-${theme.spacing(3)}px`,
  },
  col: {
    width: '50%',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  img: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const ProductPage: React.FC = () => {
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const products = useAppSelector(selectProducts);
  const reviews = useAppSelector(selectReviews);
  const auth = useAppSelector(selectAuth);
  const users = useAppSelector(selectUsers);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const currentProduct: Product = products.products.filter(
      el => el.id === params.id
    )[0];

    setProduct(currentProduct);
  }, [products]);

  const filterReviews = (reviewsArr: Review[]): Review[] => {
    return reviewsArr
      ? reviewsArr.filter(el => el.productId === params.id)
      : [];
  };

  return (
    <Layout>
      {product && (
        <div className={classes.row}>
          <div className={classes.col}>
            <img
              className={classes.img}
              src={product.image}
              alt={product.title}
            />
            <Typography variant='h3' className={classes.title}>
              {product.title}
            </Typography>
            <Typography variant='body1'>{product.text}</Typography>
          </div>
          <div className={classes.col}>
            {auth.authorized && <CommentForm productId={params.id} userId={auth.user.uid}/>}
            <ReviewsList
              reviews={() => filterReviews(reviews.reviews)}
              users={users.users}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;
