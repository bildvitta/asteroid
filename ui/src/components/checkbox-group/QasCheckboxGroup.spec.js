import { mount } from '@vue/test-utils'

import '@/index.js'
import QasCheckboxGroup from './QasCheckboxGroup.vue'

describe('Test QasCheckboxGroup component', () => {
  const wrapper = mount(QasCheckboxGroup, {
    propsData: {
      options: [
        {
          label: 'Checkbox exemple',
          children: [
            { label: 'Children 1', value: 1 },
            { label: 'Children 2', value: 2 }
          ]
        }
      ]
    }
  })

  it('Check value data after input checked', async () => {
    expect(wrapper.exists()).toBe(true)

    const checkbox = wrapper.findAll('[data-test="checkbox-group-checkbox"]')
    checkbox.trigger('click')

    const dataGroup = wrapper.vm.$data.group[0]
    expect(dataGroup).toBe(true)
  })

  it('Check render options', () => {
    const checkbox = wrapper.findAll('[data-test="checkbox-group"]')
    expect(checkbox.isVisible()).toBe(true)
    expect(checkbox).toHaveLength(1)
  })
})
