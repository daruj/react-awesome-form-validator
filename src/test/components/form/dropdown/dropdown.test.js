import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '../../../../form/dropdown/dropdown.jsx';

describe('Testing Dropdown Component', () => {
  let wrapper;

  const options = [
    { value: 'blue', text: 'Blue' },
    { value: 'orange', text: 'Orange' },
    { value: 'red', text: 'Red' }
  ];

  beforeEach(() => {
    wrapper = mount(
      <Dropdown
        name='color'
        placeHolder='Choose a color...'
        label='Choose a color *'
        className='dropdown'
        options={options}
        inputIsValid={() => {}}
        onChange={() => {}}
      />
    );
  });

  it('properly renders the dropdown', () => {
    expect(wrapper.find('select')).to.have.length(1);
  });

  options.forEach((option) => {
    it(`should render the option ${option.value} with the text ${option.text}`, () => {
      const optionElement = wrapper.find('select').find('option').filterWhere((opt) => {
        return opt.props().value == option.value && opt.props().children == option.text;
      });
      expect(optionElement).to.have.length(1);
    });
  });


  describe('Testing Dropdown Props', () => {
    it('should set a className to the dropdown', () => {
      expect(wrapper.find('select').props().className).to.contain('dropdown');
    });
    it('should have a name prop', () => {
      expect(wrapper.find('select').props().name).to.be.equal('color');
    });
    it('should disable the dropdown whtn the disabled prop is true', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('select').props().disabled).to.be.equal(true);
    });
    it('should not have the default option when the dropdown has a value set', () => {
      wrapper = mount(
        <Dropdown
          name='color'
          value='orange'
          placeHolder='Choose a color...'
          label='Choose a color *'
          className='dropdown'
          options={options}
          inputIsValid={() => {}}
          onChange={() => {}}
        />
      );
      const dropdown = wrapper.find('select');
      const firstOption = dropdown.find('option[data-default=true]');
      expect(firstOption).to.have.length(0);
    });
  });

  describe('Testing Dropdown Actions', () => {
    it('should render a default option visible', () => {
      const firstOption = wrapper.find('select').find('option[data-default=true]');
      const optionProps = firstOption.props();
      expect(firstOption).to.have.length(1);
      expect(optionProps.value).to.equal('');
      expect(optionProps.children).to.equal('Select');
    });
    it('should remove the default option when the dropdown changes its value', () => {
      const dropdown = wrapper.find('select');
      dropdown.simulate('change', { target: { value: 'abc' } });
      const firstOption = wrapper.find('select').find('option[data-default=true]');
      expect(firstOption).to.have.length(0);
    });
  });
});
