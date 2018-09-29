import React from 'react';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import App, {
  PostForm as LoadablePostForm,
  AllPosts as LoadableAllPosts
} from '../../src/Components/Router';
import PostForm from '../../src/Containers/PostForm';
import AllPosts from '../../src/Containers/AllPosts';

describe('routes', () => {
  let renderedComponent;
  const mockStore = configureStore();
  const store = mockStore({ postReducer: [] });
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    renderedComponent.unmount();
    sandbox.restore();
  });

  it('should render loading', () => {
    renderedComponent = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const postForm = renderedComponent.find('Loading');
    expect(postForm).to.have.lengthOf(1);
  });

  it('should render postform', () => {
    sandbox.stub(LoadablePostForm.prototype, 'render').callsFake(() => <PostForm />);
    renderedComponent = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const postForm = renderedComponent.find('PostForm');
    expect(postForm).to.have.lengthOf(1);
  });

  it('should render AllPosts', () => {
    sandbox.stub(LoadableAllPosts.prototype, 'render').callsFake(() => <AllPosts />);
    renderedComponent = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const allPosts = renderedComponent.find('AllPosts');
    expect(allPosts).to.have.lengthOf(1);
  });
});
