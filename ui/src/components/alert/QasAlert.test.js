import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { describe, expect, test } from 'vitest'
import QasAlert from './QasAlert.vue'
import QasBtn from '../btn/QasBtn.vue'
import QasBreakline from '../breakline/QasBreakline.vue'
import { Quasar } from 'quasar'

// Descrevemos o grupo de testes para o componente QasAlert
describe('QasAlert', () => {
  const wrapper = mount(QasAlert, {
    slots: {
      default: 'Default Text'
    },

    global: {
      plugins: [Quasar],

      slots: {
        default: h('div', 'Test 111')
      },

      components: {
        'qas-btn': QasBtn,
        'qas-breakline': QasBreakline
      }
    }
  })

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // Teste para verificar a propriedade "title"
  test('renders title correctly', async () => {
    await wrapper.setProps({ title: 'Test Title' })

    const titleElement = wrapper.get('[data-test="alert-title"]')

    expect(titleElement.text()).toBe('Test Title')
  })
})
