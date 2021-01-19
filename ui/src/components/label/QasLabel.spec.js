import { mount } from '@vue/test-utils'

import '@/index.js'
import QasLabel from './QasLabel.vue'

describe('Test QasLabel component', () => {
  const wrapper = mount(QasLabel, {
    propsData: {
      label: 'My label!'
    }
  })

  it('Mount component', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toBe('My label!')
  })

  it('Set quantity', async () => {
    await wrapper.setData({ quantity: 10 })
    expect(wrapper.text()).toBe('My label! (10)')
  })

  it('Test scoped slot', () => {
    const wrapperWithSlots = mount(QasLabel, {
      propsData: { label: 'My label with slot!', quantity: 2 },
      scopedSlots: {
        default: ({ formattedLabel }) => {
          return `<div>${formattedLabel}</div>`
        }
      }
    })

    expect(wrapperWithSlots.text()).toContain('<div>My label with slot! (2)</div>')
  })
})
