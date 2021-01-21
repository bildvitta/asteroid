import { mount } from '@vue/test-utils'

import '@/index.js'
import QasAppsMenu from './QasAppsMenu.vue'

describe('Test QasAppsMenu component', () => {
  const wrapper = mount(QasAppsMenu)

  it('Mount component', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('qas-box__elevated')
  })

  it('Display mode as form', async () => {
    await wrapper.setProps({ formMode: true })
    expect(wrapper.classes()).toContain('qas-box__outlined')
  })
})
