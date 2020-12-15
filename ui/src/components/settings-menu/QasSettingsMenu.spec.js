import { shallowMount } from '@vue/test-utils'

import '@/index.js'
import QasSettingsMenu from './QasSettingsMenu.vue'

describe('Test QasSettingsMenu component', () => {
  const fn = jest.fn()

  function test1 () {
    return console.log('fui chamado >>>>>>>')
  }

  const list = {
    block: { label: 'Block', icon: 'o_lock', handle: test1 },
    delete: { label: 'Delete', icon: 'o_delete', handle: test1 }
  }

  const wrapper = shallowMount(QasSettingsMenu, { propsData: { list } })

  it('Mount component', async () => {
    expect(wrapper.exists()).toBe(true)
    const qItems = wrapper.findAllComponents({ name: 'QItem' })

    expect(qItems.length).toBe(2)
    expect(wrapper.element).toMatchSnapshot()
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

  it('Test handle function', async () => {
    // const qItem = await wrapper.findAllComponents({ name: 'QItem' }).at(1)

    // expect(qItem.exists()).toBe(true)
    // await qItem.trigger('click')
    // await wrapper.vm.$nextTick()

    // expect(test1.called).toBe(true)
  })
})
