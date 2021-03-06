import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import AllPosts from '../../src/Containers/AllPosts';
import actionTypes from '../../src/Constants/actionTypes';

// Testing with connected component.
describe('AllPosts component testing', () => {
  const mockStore = configureStore();

  it('should render viewable posts', () => {
    const initialState = [
      {
        editing: false,
        message: 'message',
        title: 'title',
        id: '1'
      },
      {
        editing: false,
        message: 'message2',
        title: 'title2',
        id: '2'
      }
    ];

    const store = mockStore({ postReducer: initialState });
    const renderedComponent = shallow(<AllPosts store={store} />).dive();
    expect(renderedComponent).to.have.lengthOf(1);
    const viewablePost = renderedComponent.find('ViewablePost');
    expect(viewablePost).to.have.lengthOf(2);
  });

  it('should render editable posts', () => {
    const initialState = [
      {
        editing: false,
        message: 'message1',
        title: 'title1',
        id: '1'
      },
      {
        editing: true,
        message: 'message2',
        title: 'title2',
        id: '2'
      }
    ];
    const store = mockStore({ postReducer: initialState });
    const renderedComponent = shallow(<AllPosts store={store} />).dive();
    expect(renderedComponent).to.have.lengthOf(1);
    renderedComponent.setState({ id: 2 });
    const editablePost = renderedComponent.find('EditablePost');
    expect(editablePost).to.have.lengthOf(1);
  });

  context('search box when posts exist', () => {
    let renderedComponent;
    let searchBox;

    beforeEach(() => {
      const initialState = [
        {
          editing: false,
          message: 'message1',
          title: 'title1',
          id: '1'
        }
      ];
      const store = mockStore({ postReducer: initialState });
      renderedComponent = shallow(<AllPosts store={store} />).dive();
      searchBox = renderedComponent.find('input');
    });

    it('should render', () => {
      expect(renderedComponent).to.have.lengthOf(1);
      expect(searchBox).to.have.lengthOf(1);
    });

    it('should display at least one post when search successfully', () => {
      expect(renderedComponent.instance().state.keyword).to.equal('');
      searchBox.simulate('change', {
        target: { value: '1' },
        preventDefault() {}
      });
      expect(renderedComponent.instance().state.keyword).to.equal('1');
      const viewablePost = renderedComponent.find('ViewablePost');
      expect(viewablePost).to.have.lengthOf(1);
    });

    it('should display none when search failed', () => {
      expect(renderedComponent.instance().state.keyword).to.equal('');
      searchBox.simulate('change', {
        target: { value: '2' },
        preventDefault() {}
      });
      expect(renderedComponent.instance().state.keyword).to.equal('2');
      const viewablePost = renderedComponent.find('ViewablePost');
      expect(viewablePost).to.have.lengthOf(0);
    });
  });

  context('search box when no posts', () => {
    const initialState = [];
    const store = mockStore({ postReducer: initialState });
    const renderedComponent = shallow(<AllPosts store={store} />).dive();
    const searchBox = renderedComponent.find('input');

    it('should not render', () => {
      expect(searchBox).to.have.lengthOf(0);
    });
  });

  context('mapDispatchToProps', () => {
    let renderedComponent;
    let store;

    beforeEach(() => {
      store = mockStore({ postReducer: [] });
      renderedComponent = shallow(<AllPosts store={store} />).dive();
    });

    it('editPost shoule work', () => {
      renderedComponent.instance().props.editPost({ id: '1' });
      const actions = store.getActions();
      expect(actions[0].type).to.equal(actionTypes.EDIT_POST);
    });

    it('deletePost shoule work', () => {
      renderedComponent.instance().props.deletePost({ id: '1' });
      const actions = store.getActions();
      expect(actions[0].type).to.equal(actionTypes.DELETE_POST);
    });

    it('updatePost shoule work', () => {
      renderedComponent.instance().props.updatePost({ id: '1', data: {} });
      const actions = store.getActions();
      expect(actions[0].type).to.equal(actionTypes.UPDATE_POST);
    });
  });
});
