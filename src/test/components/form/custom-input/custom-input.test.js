import React from 'react';
import { shallow } from 'enzyme';
import CustomInput from '../../../../form/custom-input';

describe('Testing CustomInput Component', () => {
  it('properly renders the input text', () => {
    const wrapper = shallow(
      <CustomInput>
        <input type='text' name='my-custom-input' value='' />
      </CustomInput>
    );
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('input').props().type).to.be.equal('text');
  });
  it('properly renders the radio button', () => {
    const wrapper = shallow(
      <CustomInput>
        <input type='radio' name='my-custom-input' value='' />
      </CustomInput>
    );
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('input').props().type).to.be.equal('radio');
  });
});
