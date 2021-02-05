import { mount } from '@vue/test-utils'

import '@/index.js'
import QasPasswordInput from './QasPasswordInput.vue'
import QasPasswordStrengthChecker from '../password-strength-checker/QasPasswordStrengthChecker.vue'

describe('Test QasPasswordInput component', () => {
  const wrapper = mount(QasPasswordInput, {
    propsData: {
      hideStrengthChecker: false
    }
  })

  it('PasswordStrengthChecker is visible', () => {
    const strengthChecker = wrapper.findComponent(QasPasswordStrengthChecker)

    expect(wrapper.exists()).toBe(true)
    expect(strengthChecker.exists()).toBe(true)
  })

  it('Check event Show Password', async () => {
    const icon = wrapper.find('.q-icon')
    await icon.trigger('click')

    expect(icon.isVisible()).toBe(true)
    expect(wrapper.vm.type).toContain('text')
  })
})
