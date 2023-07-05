import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QasStatus from './QasStatus.vue'

describe('QasStatus', () => {
  it('should render', () => {
    const wrapper = mount(QasStatus)

    expect(wrapper.exists()).toBeTruthy()
  })
})
