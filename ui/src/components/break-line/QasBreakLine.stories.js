import QasBreakLine from './QasBreakLine.vue'

export default {
  component: QasBreakLine,
  title: 'Components/BreakLine',

  parameters: {
    docs: {
      description: {
        component: 'Insert line breaks where newlines `\\n` occur in the string.'
      }
    }
  },

  argTypes: {
    parentTag: {
      description: 'Tag to wrap all lines.'
    },

    tag: {
      description: 'Tag to wrap each line'
    },

    tagClass: {
      description: 'CSS classes for tag element.'
    },

    tagStyle: {
      description: 'CSS styles for tag element.'
    },

    text: {
      description: 'Text to be splitted into lines.'
    },

    split: {
      description: 'Characters to split text.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasBreakLine },
  template:
    `<qas-break-line v-bind="$props">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt consequat luctus.
      Curabitur ultrices maximus erat, et egestas enim mollis vitae.
      Proin quis enim eu ex volutpat elementum quis eu nisl.
    </qas-break-line>`
})

export const Default = Template.bind({})
Default.args = {
  tag: 'div'
}
