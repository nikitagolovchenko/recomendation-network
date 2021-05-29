import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { formatDate } from './../utils/formatDate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    item: {
      display: 'block',
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      '&:last-child': {
        borderBottom: 0,
      },
    },
    itemTitle: {
      marginBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
);

interface ReviewsProps {
  reviews: () => Review[];
  users: User[];
}

const ReviewsList: React.FC<ReviewsProps> = ({ reviews, users }) => {
  const classes = useStyles();
  const reviewsArr = reviews();

  const getUser = (uid: string): string => {
    return users.find(el => el.uid === uid)?.displayName as string;
  };

  return (
    <>
      <Typography variant='h4'>Reviews</Typography>
      {reviewsArr.length !== 0 ? (
        <List className={classes.root}>
          {reviewsArr.map(el => (
            <ListItem className={classes.item} key={el.id}>
              <div className={classes.itemTitle}>
                <Typography variant='h6'>{getUser(el.userId)}</Typography>
                <Typography variant='body2'>
                  {formatDate(el.createdAt)}
                </Typography>
              </div>
              <Typography>
                <em>Rate:</em> <Typography component='span' color='secondary' display='inline'>{el.rate}</Typography>
              </Typography>
              <Typography>
                <em>Comment:</em> <Typography component='span' color='primary' display='inline'>{el.text}</Typography>
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : <Typography>no reviews</Typography>}
    </>
  );
};

export default ReviewsList;
