import QasInput from './QasInput.vue'

export default {
  component: QasInput,
  title: 'Components/Input',
  parameters: {
    docs: {
      description: {
        component: 'Extends [QInput](https://quasar.dev/vue-components/input#Introduction), receive all props, methods, events and slots from <strong>QInput</strong>. Handle masks with unmasked-value default'
      }
    }
  },

  argTypes: {
    value: {
      description: 'model value.',
      control: { type: null }
    },

    // slots
    default: {
      description: 'Field main content',
      table: {
        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasInput },
  data () {
    return {
      text: ''
    }
  },
  template:
    `
    <div>
      <qas-input v-bind="$props" v-model="text" />
      Value unmasked: {{ text }}
    </div>
    `
})

function setTemplate (mask) {
  const code = mask ? `<qas-input v-model="text" mask="${mask}" />` : '<qas-input v-model="text" />'

  return { docs: { source: { code } } }
}

export const Default = Template.bind({})
export const PhoneMask = Template.bind({})
export const DocumentMask = Template.bind({})
export const PersonalDocumentMask = Template.bind({})
export const CompanyDocumentMask = Template.bind({})
export const PostalCodeMask = Template.bind({})

Default.parameters = setTemplate()

PhoneMask.args = { mask: 'phone' }
PhoneMask.parameters = setTemplate('phone')

DocumentMask.args = { mask: 'document' }
DocumentMask.parameters = setTemplate('document')

PersonalDocumentMask.args = { mask: 'personal-document' }
PersonalDocumentMask.parameters = setTemplate('personal-document')

CompanyDocumentMask.args = { mask: 'company-document' }
CompanyDocumentMask.parameters = setTemplate('company-document')

PostalCodeMask.args = { mask: 'postal-code' }
PostalCodeMask.parameters = setTemplate('postal-code')
