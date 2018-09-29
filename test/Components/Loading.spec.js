import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Loading from '../../src/Components/Loading';

describe('Loading component', () => {
  it('should render', () => {
    const renderedComponent = shallow(<Loading />);
    expect(renderedComponent).to.have.lengthOf(1);
    const spinner = renderedComponent.find('.mdl-spinner');
    expect(spinner).to.have.lengthOf(1);
  });
});
