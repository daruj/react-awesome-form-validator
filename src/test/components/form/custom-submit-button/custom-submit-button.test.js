import React from 'react';
import { mount } from 'enzyme';
import CustomSubmitButton from '../../../../form/custom-submit-button';
import Button from '../../../../form/button';

describe('Testing CustomSubmitButton Component', () => {
  it('properly renders the button', () => {
    const wrapper = mount(
      <CustomSubmitButton>
        <Button
          fieldClassName='ButtonWrapper'
          className='button'
          onClick={() => {}}
          disabled={false}
        >Reset Form</Button>
      </CustomSubmitButton>
    );
    expect(wrapper.find('button')).to.have.length(1);
  });
});
