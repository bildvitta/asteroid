import { mount, shallowMount } from '@vue/test-utils'

import '@/index.js'
import QasDebugger from './QasDebugger.vue'

describe('Test QasDebugger component', () => {
  const wrapper = mount(QasDebugger, {
    propsData: {
      inspect: ['A string', 43110, ['An', 'array'], { An: 'object' }, true]
    }
  })

  const shallowWrapper = shallowMount(QasDebugger, {
    propsData: {
      inspect: ['A string', 43110, ['An', 'array'], { An: 'object' }, true]
    }
  })

  it('check prop render', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().inspect).toHaveLength(5)
    expect(wrapper.text()).toContain('A string')
  })

  it('component render loop', async () => {
    expect(shallowWrapper.exists()).toBe(true)

    const inspectArray = shallowWrapper.findAll('[data-test="debugger-item"]')
    expect(inspectArray).toHaveLength(5)
  })
})
