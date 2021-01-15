import QasResizer from './QasResizer.vue'

export default {
  component: QasResizer,
  title: 'Components/Resizer',
  parameters: {
    docs: {
      description: {
        component: 'Component for resizing images.'
      }
    }
  },

  argTypes: {
    resize: {
      description: 'Options to resize: cover, contain, fill, inside, outside.'
    },

    size: {
      description: 'Image size.'
    },

    source: {
      description: 'Path of image.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasResizer },
  template:
    '<qas-resizer v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  source: '//placehold.it/1000'
}
