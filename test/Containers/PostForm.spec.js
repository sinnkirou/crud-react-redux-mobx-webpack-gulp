import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { PostForm, mapDispatchToProps } from '../../src/Containers/PostForm';

// Testing with unconnected component.
describe('PostForm component testing', () => {
  const getDefaualtProps = () => ({
    addPost: () => {}
  });

  it('should render', () => {
    const props = getDefaualtProps();
    const renderedComponent = shallow(<PostForm {...props} />);
    expect(renderedComponent).to.have.lengthOf(1);
    const postHeading = renderedComponent.find('h1.post_heading');
    expect(postHeading).to.have.lengthOf(1);
    const editablePost = renderedComponent.find('EditablePost');
    expect(editablePost).to.have.lengthOf(1);
  });

  it('mapDispatchToProps should work', () => {
    let expectedType = '';
    const dispatch = callback => {
      if (callback) {
        const { type } = callback;
        expectedType = type;
      }
    };
    mapDispatchToProps(dispatch).addPost({});
    expect(expectedType).to.equal('ADD_POST');
  });
});
