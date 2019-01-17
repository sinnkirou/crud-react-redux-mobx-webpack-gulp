import { expect } from 'chai';
import _ from 'lodash';
import postReducer from '../../src/Reducers/postReducer';
import actionTypes from '../../src/Constants/actionTypes';

describe('Reducers testing', () => {
  const defaultState = [
    {
      editing: false,
      message: 'message',
      title: 'title',
      id: 1
    }
  ];
  const defaultAction = {
    type: actionTypes.ADD_POST
  };

  it('when default', () => {
    expect(postReducer([], {})).to.have.lengthOf(0);
  });

  it('can handle addPost', () => {
    const state = _.cloneDeep(defaultState);
    const action = _.cloneDeep(defaultAction);
    action.type = actionTypes.ADD_POST;
    action.data = {
      editing: false,
      message: 'newmessage',
      title: 'newtitle'
    };
    const actualResult = postReducer(state, action);
    const expectResult = [
      {
        ...state[0]
      },
      {
        ...action.data,
        id: 2
      }
    ];
    actualResult.forEach((item, index) => {
      expect(item.message).to.equal(expectResult[index].message);
      expect(item.title).to.equal(expectResult[index].title);
    });
  });

  it('can handle deletePost', () => {
    const state = _.cloneDeep(defaultState);
    const action = _.cloneDeep(defaultAction);
    action.type = actionTypes.DELETE_POST;
    action.id = 1;
    expect(JSON.stringify(postReducer(state, action))).to.equal(JSON.stringify([]));
  });

  it('can handle editPost when id matched', () => {
    const state = _.cloneDeep(defaultState);
    const action = _.cloneDeep(defaultAction);
    action.type = actionTypes.EDIT_POST;
    action.id = 1;
    expect(JSON.stringify(postReducer(state, action))).to.equal(
      JSON.stringify([
        {
          editing: true,
          message: 'message',
          title: 'title',
          id: 1
        }
      ])
    );
  });

  it('can handle editPost when id not match', () => {
    const state = _.cloneDeep(defaultState);
    const action = _.cloneDeep(defaultAction);
    action.type = actionTypes.EDIT_POST;
    action.id = 2;
    expect(JSON.stringify(postReducer(state, action))).to.equal(JSON.stringify(state));
  });

  it('can handle updatePost when id matched', () => {
    const state = _.cloneDeep(defaultState);
    const action = _.cloneDeep(defaultAction);
    action.type = actionTypes.UPDATE_POST;
    action.id = 1;
    action.data = {
      message: 'newmessage',
      title: 'newtitle'
    };
    expect(JSON.stringify(postReducer(state, action))).to.equal(
      JSON.stringify([
        {
          editing: true,
          message: 'newmessage',
          title: 'newtitle',
          id: 1
        }
      ])
    );
  });

  it('can handle updatePost when id not match', () => {
    const state = _.cloneDeep(defaultState);
    const action = _.cloneDeep(defaultAction);
    action.type = actionTypes.UPDATE_POST;
    action.id = 2;
    action.data = {
      message: 'newmessage',
      title: 'newtitle'
    };
    expect(JSON.stringify(postReducer(state, action))).to.equal(JSON.stringify(state));
  });
});
