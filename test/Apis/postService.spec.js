import { expect } from 'chai';
import postService from '../../src/Apis/postService';

describe('services testing', () => {
  it('can call getPosts', () => {
    let triggered = false;
    const resolve = () => {
      triggered = true;
    };
    postService.getPosts(resolve).then(() => {
      expect(triggered).to.equal(true);
    });
  });
});
