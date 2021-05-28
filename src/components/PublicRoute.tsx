import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router';
import { useAppSelector } from '../hooks/useRedux'
import { selectAuth } from '../store/authSlice'

const PublicRoute: React.FC<RouteProps> = (props) => {
  const auth = useAppSelector(selectAuth);

  return (
    !auth.authorized ? <Route path={props.path} component={props.component} { ...props } /> : <Redirect to='/' />
  )
}

export default PublicRoute