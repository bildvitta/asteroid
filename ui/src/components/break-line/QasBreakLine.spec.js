import { mount } from '@vue/test-utils'

import '@/index.js'
import QasBreakLine from './QasBreakLine.vue'

describe('Test QasBreakLine component', () => {
  const wrapper = mount(QasBreakLine, {
    propsData: {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. \n Error tempora vero aspernatur facere. Deserunt delectus amet eveniet velit reprehenderit itaque',
      tagClass: 'my-class'
    }
  })

  it('test defaults', () => {
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.findAll('div')).toHaveLength(3)
    expect(wrapper.findAll('.my-class')).toHaveLength(2)
    expect(wrapper.isVisible()).toBe(true)
  })

  it('change parentTag', async () => {
    await wrapper.setProps({ parentTag: 'section' })

    expect(wrapper.find('section').isVisible()).toBe(true)
  })

  it('change tag', async () => {
    await wrapper.setProps({ tag: 'span' })

    expect(wrapper.findAll('span')).toHaveLength(2)
  })
})
