import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './Loading';

// using static import when using gulp
// import PostForm from '../Containers/PostForm';
// import AllPosts from '../Containers/AllPosts';
export const PostForm = Loadable({
  loader: () => import(/* webpackChunkName: "postForm" */ '../Containers/PostForm'),
  loading: Loading
});

export const AllPosts = Loadable({
  loader: () => import(/* webpackChunkName: "allPosts" */ '../Containers/AllPosts'),
  loading: Loading
});

export const ChatRoom = Loadable({
  loader: () => import(/* webpackChunkName: "allPosts" */ '../Containers/ChatRoom'),
  loading: Loading
});

const routes = [
  {
    path: '/',
    component: PostForm,
    exact: true
  },
  {
    path: '/posts',
    component: AllPosts
  },
  {
    path: '/chat',
    component: ChatRoom
  }
];

const router = () => (
  <Switch>
    {routes.map(route => (
      <Route {...route} key="Route" />
    ))}
  </Switch>
);

export default router;
