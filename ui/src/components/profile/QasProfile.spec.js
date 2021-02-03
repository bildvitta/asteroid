import { mount } from '@vue/test-utils'

import '@/index.js'
import QasProfile from './QasProfile.vue'
import QasAvatar from '../avatar/QasAvatar.vue'

describe('Test QasProfile component', () => {
  const wrapper = mount(QasProfile, {

    propsData: {
      title: 'Profile',
      iconic: true
    },

    slots: {
      afterTitle: 'slot afterTitle text',
      beforeTitle: 'slot beforeTitle text',
      meta: 'slot meta'
    }
  })

  it('Check component and slots', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('P')
    expect(wrapper.text()).toContain('slot afterTitle text')
    expect(wrapper.text()).toContain('slot beforeTitle text')
    expect(wrapper.text()).toContain('slot meta')
  })

  it('Avatar display', async () => {
    wrapper.vm.$q.screen.gt.sm = false
    await wrapper.vm.$nextTick()

    const avatar = wrapper.findComponent(QasAvatar)
    expect(avatar.exists()).toBe(false)
  })
})
