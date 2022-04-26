import QasSignatureUploader from './QasSignatureUploader.vue'

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
      description: 'Used by server to know where to store files in the assets bucket.'
    },

    uploadLabel: {
      description: 'QasUploader header label.'
    },

    signatureLabel: {
      description: 'Generated signature label.'
    },

    dialogProps: {
      description: 'Set props in dialog',
      table: {
        defaultValue: { summary: JSON.stringify({}) }
      }
    },

    value: {
      description: 'Model value.'
    },

    errorMessage: {
      description: 'Error message.'
    },

    type: {
      description: 'Type of file that the signature is going to be.'
    },

    readonly: {
      description: 'Disable action buttons.'
    },

    // Events
    input: {
      description: 'Fires when model changes. Is also used by `v-model`.'
    }
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
