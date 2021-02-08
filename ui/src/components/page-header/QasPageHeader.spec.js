import { shallowMount } from '@vue/test-utils'

import '@/index.js'
import QasPageHeader from './QasPageHeader.vue'

describe('displays message', () => {
  const wrapper = shallowMount(QasPageHeader, {
    propsData: {
      breadcrumbs: [
        { label: 'Jest', route: '/Jest' },
        { label: 'Jest Test', route: '/Jest Test' }
      ],
      noBreadcrumbs: false,
      root: { label: 'home', route: '/' },
      title: 'PageHeader'
    },

    slots: {
      default: '<q-btn label="slot button" />'
    }
  })

  it('Check component render title', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('PageHeader')
  })

  it('Check computed', () => {
    const breadcrumbs = wrapper.vm.transformedBreadcrumbs

    expect(breadcrumbs).toHaveLength(3)
  })

  it('Check breadcrumbs render', () => {
    const inspectArray = wrapper.findAll('[data-test="page-header"]')

    expect(inspectArray.exists()).toBe(true)
    expect(inspectArray).toHaveLength(3)
  })

  it('Show Slot', () => {
    const slot = wrapper.find('.q-btn')

    expect(slot.text()).toContain('slot button')
  })
})
