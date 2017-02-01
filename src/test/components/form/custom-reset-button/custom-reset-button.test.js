import React from 'react';
import { mount } from 'enzyme';
import CustomResetButton from '../../../../form/custom-reset-button';
import Button from '../../../../form/button';

describe('Testing CustomResetButton Component', () => {
  it('properly renders the button', () => {
    const wrapper = mount(
      <CustomResetButton>
        <Button
          fieldClassName='ButtonWrapper'
          className='button'
          onClick={() => {}}
          disabled={false}
        >Submit Form</Button>
      </CustomResetButton>
    );
    expect(wrapper.find('button')).to.have.length(1);
  });
});
