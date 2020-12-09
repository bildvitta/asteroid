import { mount } from '@vue/test-utils'

import '@/index.js'
import QasAvatar from './QasAvatar.vue'

test('displays message', () => {
  const wrapper = mount(QasAvatar, {
    propsData: {
      title: 'Hello world'
    }
  })

  expect(wrapper.text()).toContain('H')
})
