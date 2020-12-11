import { mount, createLocalVue } from '@vue/test-utils'
import '@/index.js'
import QasFormGenerator from './QasFormGenerator.vue'


describe('Testing q-as-form-generator component', () => {
  const fields = {
    name: { name: 'name', label: 'Nome' },
    email: { name: 'email', label: 'E-mail', type: 'email' },
    color: {
      name: 'color',
      label: 'Cores',
      type: 'select',
      options: [
        { label: 'Vermelho', value: 'red' },
        { label: 'Azul', value: 'blue' },
        { label: 'Verde', value: 'green' }
      ]
    }
  }

  const wrapper = mount(QasFormGenerator, {
    propsData: {
      fields,
      value: {
        name: 'Teste',
        email: 'teste@teste.com',
        color: 'red'
      }
    }
  })

  // const qInput = wrapper.findComponent({ name: 'QInput' })
  // const qSelect = wrapper.findComponent({ name: 'QSelect' })
  // const qInputEmail = wrapper.findAllComponents({ name: 'QInput' }).at(1)

  it('Check if input and select exists', async () => {
    const qInput = await wrapper.find('input[type="text"]')
    const inputEmail = await wrapper.find('input[type="email"]')
    const qSelect = wrapper.findComponent({ name: 'QSelect' })

    expect(qInput.exists()).toBe(true)
    expect(inputEmail.exists()).toBe(true)
    expect(qSelect.exists()).toBe(true)
  })

  // it('test name field', async () => {
  //   const qInput = await wrapper.findComponent({ name: 'QInput' })

  //   expect(qInput.isVisible()).toBe(true)
  //   expect(qInput.props().value).toBe('Teste')
  //   expect(qInput.props().label).toBe('Nome')

  //   await qInput.setProps({
  //     error: true,
  //     errorMessage: 'Erro no nome'
  //   })

  //   const errorElement = qInput.find('.q-field__messages')

  //   expect(errorElement.exists()).toBe(true)
  //   expect(qInput.classes()).toContain('q-field--error')
  //   expect(errorElement.text()).toBe('Erro no nome')
  // })

  // it('test colors field', async () => {
  //   const qSelect = await wrapper.findComponent({ name: 'QSelect' })

  //   expect(qSelect.isVisible()).toBe(true)
  //   expect(qSelect.props().value).toBe('red')
  //   expect(qSelect.props().label).toBe('Cores')

  //   await qSelect.setProps({
  //     error: true,
  //     errorMessage: 'Erro na cor'
  //   })

  //   const errorElement = qSelect.find('.q-field__messages')

  //   expect(errorElement.exists()).toBe(true)
  //   expect(qSelect.classes()).toContain('q-field--error')
  //   expect(errorElement.text()).toBe('Erro na cor')
  // })

  // it('test prop "fieldsProps"', async () => {
  //   await wrapper.setProps({
  //     fieldsProps: {
  //       name: { loading: true, disable: true },
  //       email: { readonly: true },
  //       color: { clearable: true }
  //     }
  //   })

  //   expect(qInput.props().loading).toBe(true)
  //   expect(qInput.props().disable).toBe(true)
  //   expect(qInputEmail.props().readonly).toBe(true)
  //   expect(qSelect.props().clearable).toBe(true)
  // })

  // it('test prop "fieldsEvents"', async () => {
  //   // function onClickFn () {
  //   //   return 'Function called'
  //   // }

  //   const onClickFn = jest.fn()
  //   const onInputFn = jest.fn()

  //   // function onInputFn () {
  //   //   return 'Function called'
  //   // }

  //   await wrapper.setProps({
  //     fieldsEvents: {
  //       name: { click: onClickFn },
  //       email: { input: onInputFn }
  //     }
  //   })

  //   await qInputEmail.trigger('input')

  //   expect(onInputFn).toHaveBeenCalled()
  // })
})
