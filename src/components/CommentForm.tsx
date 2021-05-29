import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Theme, Typography, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useAppDispatch } from './../hooks/useRedux';
import { addReview } from '../store/reviewsSlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
}));

interface CommentFormProps {
  productId: string;
  userId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ productId, userId }) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = React.useState<string>('');
  const [rating, setRating] = React.useState<number | null>(0);
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addReview({
        createdAt: String(new Date()),
        productId,
        userId,
        rate: rating,
        text: comment,
      } as Review)
    );

    setComment('');
    setRating(0);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Box mb={1} borderColor='transparent'>
        <Typography component='legend'>Rating:</Typography>
        <Rating
          name='simple-controlled'
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Box mb={1}>
        <TextField
          fullWidth
          id='comment'
          label='Comment...'
          multiline
          rows={4}
          variant='outlined'
          value={comment}
          onChange={event => {
            setComment(event.target.value);
          }}
        />
      </Box>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={comment === ''}
      >
        Add comment
      </Button>
    </form>
  );
};

export default CommentForm;
