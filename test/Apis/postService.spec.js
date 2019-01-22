import { expect } from 'chai';
import postService, { InitialPosts } from '../../src/Apis/postService';

describe('services testing', () => {
  it('can call getPosts', done => {
    const resolve = data => {
      expect(data).to.equal(InitialPosts);
      done();
    };

    postService.getPosts(resolve);
  });
});
