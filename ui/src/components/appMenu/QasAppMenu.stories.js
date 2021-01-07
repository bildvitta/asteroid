import QasAppMenu from './QasAppMenu.vue'

export default {
  title: 'Components/AppMenu',
  component: QasAppMenu,
  parameters: {
    docs: { 
      description: { 
        component: 'Button component'
      } 
    }
  },

  argTypes: {
    items: {
      name: 'items',
      description: 'Avoid turning label text into caps (which happens by default)'
    },
    value: {
      name: 'value',
      description: 'Avoid turning label text into caps (which happens by default)'
    },
    scrollAreaClass: {
      name: 'scrollAreaClass',
      description: 'Avoid turning label text into caps (which happens by default)'
    },
    itemClass: {
      name: 'itemClass',
      description: 'Avoid turning label text into caps (which happens by default)'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasAppMenu },
  template:
   `<qas-app-menu v-bind="$props" />`
})

export const Default = Template.bind({})
Default.args = {
  label: 'Click Here'
}