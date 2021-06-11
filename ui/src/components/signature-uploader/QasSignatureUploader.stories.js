import QasSignatureUploader from './QasSignatureUploader.vue'

const hides = {
  table: { disable: true }
}

export default {
  component: QasSignatureUploader,
  title: 'Components/SignatureUploader',

  parameters: {
    docs: {
      description: {
        component: 'Extends the QasUploader and QasSignaturePad. Responsible for uploading the generated signature.'
      }
    }
  },

  argTypes: {
    // Props
    entity: {
      description: 'Used by server to know where to store files in the assets bucket.',
    },

    labelUpload: {
      description: 'QasUploader header label.'
    },

    labelSignature: {
      description: 'Generated signature label.'
    },

    value: hides,

    // Events
    input: hides
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasSignatureUploader },
  props: Object.keys(argTypes),

  data () {
    return {
      signature: ''
    }
  },

  template: '<qas-signature-uploader v-model="signature" v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  entity: 'posts/image'
}