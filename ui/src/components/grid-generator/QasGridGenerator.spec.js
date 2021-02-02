import { shallowMount } from '@vue/test-utils'

import '@/index.js'
import QasGridGenerator from './QasGridGenerator.vue'

describe('Test QasGridGenerator component', () => {
  // criar a data do componente
  const result = {
    name: 'John Appleseed',
    email: 'john.appleseed@example.com',
    phone: '99999999999',
    gender: 'Male',
    document: '99999999999',
    address: '747 Austen View'
  }

  const fields = {
    name: { name: 'name', label: 'Full name', type: 'text' },
    email: { name: 'email', label: 'E-mail', type: 'email' },
    phone: { name: 'phone', label: 'Phone', type: 'text', mask: 'phone' },
    gender: { name: 'gender', label: 'Gender', type: 'text' },
    document: { name: 'document', label: 'Document', type: 'text', mask: 'document' },
    address: { name: 'address', label: 'Address', type: 'text' }
  }

  const shallowWrapper = shallowMount(QasGridGenerator, {
    propsData: {
      result: result,
      fields: fields
    }
  })

  it('Check Component if is Render', () => {
    expect(shallowWrapper.exists()).toBe(true)
    expect(shallowWrapper.props().result.name).toBe('John Appleseed')
    expect(shallowWrapper.text()).toContain('Full name')
    expect(shallowWrapper.text()).toContain('John')
  })

  it('Check if Slots render array', () => {
    const inspectArray = shallowWrapper.findAll('[data-test="grid-generator"]')

    expect(inspectArray).toHaveLength(6)
  })
})
