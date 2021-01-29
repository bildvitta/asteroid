import QasResizer from './QasResizer.vue'

export default {
  component: QasResizer,
  title: 'Components/Resizer',

  parameters: {
    docs: {
      description: {
        component: 'Resize images on cloud.'
      }
    }
  },

  argTypes: {
    resize: {
      control: { type: 'select', options: ['cover', 'contain', 'fill', 'inside', 'outside'] },
      description: 'Resizer fit format.'
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
  size: '100x100',
  source: '//placehold.it/1000'
}
