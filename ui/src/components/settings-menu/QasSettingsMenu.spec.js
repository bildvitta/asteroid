import { shallowMount } from '@vue/test-utils'

import '@/index.js'
import QasSettingsMenu from './QasSettingsMenu.vue'

describe('Test QasSettingsMenu component', () => {
  const fn = jest.fn()

  const list = {
    block: { label: 'Block', icon: 'o_lock', handle: fn },
    delete: { label: 'Delete', icon: 'o_delete', handle: fn }
  }

  const wrapper = shallowMount(QasSettingsMenu, { propsData: { list } })

  it('Mount component', async () => {
    expect(wrapper.exists()).toBe(true)
    const qItems = wrapper.findAllComponents({ name: 'QItem' })

    expect(qItems).toHaveLength(2)
  })

  it('Test slots', () => {
    const wrapperWithSlots = shallowMount(QasSettingsMenu, {
      propsData: { list },
      slots: {
        block: "<div>Hi i'm a div with block slot xD</div>",
        delete: "<div>Hi i'm a div with delete slot xD</div>"
      }
    })

    expect(wrapperWithSlots.text()).toContain("Hi i'm a div with block slot xD")
    expect(wrapperWithSlots.text()).toContain("Hi i'm a div with delete slot xD")
  })

  it('Test function call when clicked', async () => {
    await wrapper.trigger('click').then()

    const qItems = wrapper.findAllComponents({ name: 'qItem' })
    const qItem = qItems.at(0)

    expect(qItem.exists()).toBe(true)
    expect(qItem.text()).toContain('Block')
    await qItem.vm.$emit('click')

    expect(fn).toHaveBeenCalled()
  })
})
