import { shallowMount, mount } from '@vue/test-utils'

import '@/index.js'
import QasSettingsMenu from './QasSettingsMenu.vue'

describe('Test QasSettingsMenu component', () => {
  const fn = jest.fn()

  function test1 () {
    return console.log('fui chamado >>>>>>>')
  }

  const list = {
    block: { label: 'Block', icon: 'o_lock', handle: fn },
    delete: { label: 'Delete', icon: 'o_delete', handle: fn }
  }

  const wrapper = shallowMount(QasSettingsMenu, { propsData: { list } })
  const wrapperMount = mount(QasSettingsMenu, { propsData: { list } })

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
    await wrapperMount.trigger('click')
    // console.log(wrapperMount.element.outerHTML)
    // expect(wrapperMountMount.element).toMatchSnapshot()
    console.log(document)
    const qItem = await wrapperMount.find('.settings-menu__list')
    console.log(qItem)

    // expect(qItem.exists()).toBe(true)
    await wrapperMount.trigger('click')
    // await qItem.trigger('click')
    expect(fn).toHaveBeenCalled()
  })
})
