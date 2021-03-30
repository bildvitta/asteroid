import { mount } from '@vue/test-utils'

import '@/index.js'
import QasAppBar from './QasAppBar.vue'

describe('Test QasAppBar component', () => {
  const wrapper = mount(QasAppBar, {
    propsData: {
      brand: '//placehold.it/100',
      isAuth: true,
      title: 'AppBar',
      user: {
        email: 'jon-snow@email.com',
        name: 'Jon Snow',
        photo: 'https://www.abc.net.au/cm/lb/6367016/data/alan2c-see-the-person-data.jpg'
      }
    }
  })

  it('Checks whether the component has been rendered', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('Checks whether the Menu has been rendered', () => {
    const btn = wrapper.findComponent({ ref: 'dataTestQbtn' })
    expect(btn.exists()).toBe(true)
  })

  it('Checks whether the Brand has been rendered', () => {
    const img = wrapper.findAll('img').at(0)

    expect(wrapper.props().brand).toBe('//placehold.it/100')
    expect(img.exists()).toBe(true)
    expect(img.classes()).toContain('qas-toolbar__brand')
  })

  it('Checks whether the prop title renders the value', () => {
    expect(wrapper.props().title).toBe('AppBar')
    expect(wrapper.text()).toContain('AppBar')
  })

  it('Checks the status of the AppMenu component', async () => {
    // without the prop
    const appsMenu = wrapper.findComponent({ ref: 'dataTest-AppsMenu' })

    expect(appsMenu.exists()).toBe(false)

    // with the prop
    await wrapper.setProps({ apps: [{ href: 'https://google.com', image: '//placehold.it/100', label: 'Company' }] })

    const appsMenuExist = wrapper.findComponent({ ref: 'dataTest-AppsMenu' })

    expect(appsMenuExist.exists()).toBe(true)
  })

  it('Checks whether the profile has been rendered', () => {
    const avatar = wrapper.findComponent({ ref: 'dataTest-Avatar' })
    expect(avatar.exists()).toBe(true)
  })
})
