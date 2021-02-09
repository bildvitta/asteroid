import { mount } from '@vue/test-utils'

import '@/index.js'
import QasDateTimeInput from './QasDateTimeInput.vue'

describe('Test QasDateTimeInput component', () => {
  const wrapper = mount(QasDateTimeInput, {
    data () {
      return {
        currentValue: ''
      }
    }
  })

  it('Check v-model', () => {
    expect(wrapper.exists()).toBe(true)

    const dateTime = wrapper.find('input')
    dateTime.element.value = '10/02/2021 11:30'
    dateTime.trigger('input')

    expect(wrapper.vm.currentValue).toBe('10/02/2021 11:30')
  })

  it('Check icons exists', () => {
    const dateInput = wrapper.find('[data-test="date-input"]')
    const timeInput = wrapper.find('[data-test="time-input"]')

    expect(dateInput.exists()).toBe(true)
    expect(timeInput.exists()).toBe(true)
  })

  it('Check Popup is visible', async () => {
    // date
    const dateInput = wrapper.find('[data-test="date-input"]')
    await dateInput.trigger('click')

    const popupDate = document.querySelector('.q-date')
    expect(popupDate).toBeVisible(true)

    // time
    const timeInput = wrapper.find('[data-test="time-input"]')
    await timeInput.trigger('click')

    const popupTime = document.querySelector('.q-time')
    expect(popupTime).toBeVisible(true)
  })
})
