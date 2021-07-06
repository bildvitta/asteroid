import QasSignaturePad from './QasSignaturePad.vue'

export default {
  component: QasSignaturePad,
  title: 'Components/SignaturePad',

  parameters: {
    docs: {
      description: {
        component: 'Extends the [signature_pad](https://github.com/szimek/signature_pad) library.'
      }
    }
  },

  argTypes: {
    // Props
    options: {
      description: 'Options you can pass to customize your component [Signature Pad](https://github.com/szimek/signature_pad#options) options.',
      control: 'object'
    },

    type: {
      description: 'Type of image the generated base64 will have',
      sumarry: 'image/png',
      control: null
    },

    height: {
      description: 'Canvas Height.'
    },

    isEmpty: {
      table: {
        disable: true
      }
    },

    // Events
    'update:isEmpty': {
      description: 'Props sent to the component to control it, if the canvas is empty.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasSignaturePad },
  props: Object.keys(argTypes),
  template: '<qas-signature-pad v-bind="$props" />'
})

export const Default = Template.bind({})
