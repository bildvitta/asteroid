import QasInput from './QasInput.vue'

export default {
  component: QasInput,
  title: 'Components/Input',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QInput](https://quasar.dev/vue-components/input). Can mask raw values by default.'
      }
    }
  },

  argTypes: {
    // Props
    value: {
      description: 'Input text value.',
      control: { type: null }
    },

    // Slots
    default: {
      description: 'Field main content',
      table: {
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasInput },
  props: Object.keys(argTypes),

  data () {
    return {
      text: ''
    }
  },

  template:
    `<div>
      <qas-input v-bind="$props" v-model="text" />
      <pre v-if="text">{{ text }}</pre>
    </div>`
})

function setTemplate (mask) {
  const code = mask
    ? `<qas-input v-model="text" mask="${mask}" />`
    : '<qas-input v-model="text" />'

  return { docs: { source: { code } } }
}

export const Default = Template.bind({})
Default.parameters = setTemplate()

export const PhoneMask = Template.bind({})
PhoneMask.args = { mask: 'phone' }
PhoneMask.parameters = setTemplate('phone')

export const DocumentMask = Template.bind({})
DocumentMask.args = { mask: 'document' }
DocumentMask.parameters = setTemplate('document')

export const PersonalDocumentMask = Template.bind({})
PersonalDocumentMask.args = { mask: 'personal-document' }
PersonalDocumentMask.parameters = setTemplate('personal-document')

export const CompanyDocumentMask = Template.bind({})
CompanyDocumentMask.args = { mask: 'company-document' }
CompanyDocumentMask.parameters = setTemplate('company-document')

export const PostalCodeMask = Template.bind({})
PostalCodeMask.args = { mask: 'postal-code' }
PostalCodeMask.parameters = setTemplate('postal-code')
