import { mount, shallowMount } from '@vue/test-utils'

import '@/index.js'
import QasAppsMenu from './QasAppsMenu.vue'

describe('Test QasAppsMenu component', () => {
  const apps = [
    {
      image: '//placehold.it/100',
      label: 'My image',
      href: 'https://www.google.com'
    },
    {
      image: 'aaaaaaaaa//placehold.it/100',
      label: 'My image',
      href: 'https://www.google.com'
    },
    {
      image: '//placehold.it/100',
      label: 'My image',
      href: 'https://www.google.com'
    }
  ]

  const shallowWrapper = shallowMount(QasAppsMenu, {
    propsData: {
      apps
    }
  })

  const wrapper = mount(QasAppsMenu, {
    propsData: {
      apps
    }
  })

  it('Open menu', async () => {
    await wrapper.trigger('click')
    const menuElement = document.querySelector('.q-menu')

    expect(menuElement).toBeVisible()
  })

  it('check links', async () => {
    const links = shallowWrapper.findAll('[data-test="apps-menu-link"]')

    expect(links).toHaveLength(3)

    for (let index = 1; index < links.length; index++) {
      const linkWrapper = links.at(index)
      const avatarWrapper = linkWrapper.get('img')

      expect(avatarWrapper.isVisible()).toBe(true)
      expect(linkWrapper.text()).toBe('My image')
      expect(linkWrapper.attributes().href).toBe('https://www.google.com')
    }
  })
})
