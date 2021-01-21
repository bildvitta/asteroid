import { mount } from '@vue/test-utils'

import '@/index.js'
import QasAppsMenu from './QasAppsMenu.vue'

describe('Test QasAppsMenu component', () => {
  const wrapper = mount(QasAppsMenu)

  it('Mount component', async () => {
    const menu = wrapper.findComponent({ name: 'QMenu' })
    wrapper.vm.$emit('click')
    await wrapper.vm.$nextTick()
    console.log(wrapper.emitted())
    expect(menu.emitted().input).toBeTruthy()

    expect(menu.exists()).toBe(true)
  })
})
