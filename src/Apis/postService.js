/**
 * Mocking client-server processing
 */
const InitialPosts = [
  {
    id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    title: 'My journey with React',
    message: 'My journey with React'
  },
  {
    id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3f',
    title: 'Blogging with React',
    message: 'Blogging with React'
  },
  {
    id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3g',
    title: 'Why React is so fun',
    message: 'Why React is so fun'
  }
];

export default {
  getPosts(resolve) {
    return new Promise(() => setTimeout(() => resolve(InitialPosts), 1000));
  }
};
