import { mount } from '@vue/test-utils'

import '@/index.js'
import QasCopy from './QasCopy.vue'

describe('Test QasCopy component', () => {
  const spyCopyToClipboard = jest.spyOn(QasCopy.methods, 'copy')

  const wrapper = mount(QasCopy, {
    propsData: {
      label: 'Click here to copy!'
    }
  })

  it('test defaults', () => {
    expect(wrapper.element).toMatchSnapshot()

    const buttonElement = wrapper.findComponent({ name: 'QBtn' })
    buttonElement.trigger('click')

    expect(spyCopyToClipboard).toHaveBeenCalled()
    expect(spyCopyToClipboard).toHaveBeenCalledTimes(1)
  })
})
