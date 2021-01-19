import { mount } from '@vue/test-utils'

import '@/index.js'
import QasSearchBox from './QasSearchBox.vue'

describe('Test QasSearchBox component', () => {
  const mockedList = [
    { label: 'Teste 1', value: 1 },
    { label: 'Teste 2', value: 2 },
    { label: 'Teste 3', value: 3 },
    { label: 'Teste 4', value: 4 },
    { label: 'Teste 5', value: 5 },
    { label: 'Teste 6', value: 6 }
  ]

  const wrapper = mount(QasSearchBox, {
    propsData: {
      list: mockedList,
      fuseOptions: { keys: ['label'] }
    }
  })

  it('Find first', async () => {
    await wrapper.setData({ search: 'Teste 1' })

    expect(wrapper.vm.results).toHaveLength(1)
    expect(wrapper.vm.results).toEqual(expect.arrayContaining([
      expect.objectContaining({
        item: {
          label: 'Teste 1',
          value: 1
        }
      })
    ]))
  })

  it('Find all', async () => {
    await wrapper.setData({ search: 'Teste' })

    expect(wrapper.vm.results).toHaveLength(6)
  })

  it('Return empty results', async () => {
    await wrapper.setData({ search: 'Teste 123' })

    expect(wrapper.vm.results).toHaveLength(0)
    expect(wrapper.vm.hasResults).toBe(false)
  })
})
