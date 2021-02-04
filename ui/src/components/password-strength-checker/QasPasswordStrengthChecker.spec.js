import { mount } from '@vue/test-utils'

import '@/index.js'
import QasPasswordStrengthChecker from './QasPasswordStrengthChecker.vue'

describe('Test QasPasswordStrengthChecker component', () => {
  const wrapper = mount(QasPasswordStrengthChecker, {
    propsData: {
      value: 'exemple'
    }
  })

  it('Mount Componente and check computed', () => {
    const computed = wrapper.vm.length

    expect(wrapper.exists()).toBe(true)
    expect(computed).toBe(7)
  })

  it('check is linear-progress is visible', () => {
    const div = wrapper.find('[data-test="QasPasswordStrengthChecker"]')

    expect(div.isVisible()).toBe(true)
  })
})
