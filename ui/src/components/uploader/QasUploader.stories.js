import QasUploader from './QasUploader.vue'

const descriptionUploader = `Uploading files through a component.<br>
                             This component implements QUploader https://quasar.dev/vue-components/uploader#Introduction <br>
                             Requires a back-end server to receive the files.<br>
                             Drag-and-drop compatible.<br>
                             Require axios https://www.npmjs.com/package/axios`

export default {
  title: 'Components/QasUpload',
  component: QasUploader,
  parameters: {
    docs: {
      description: {
        component: descriptionUploader
      }
    }
  },

  argTypes: {
    // props
    entity: {
      description: 'Vuex entity. more info: https://vuex.vuejs.org/',
      defaultValue: {
        summary: null
      }
    },

    hint: {
      description: 'hint message'
    },

    maxFiles: {
      description: 'Maximum number of files to contain'
    },

    label: {
      description: 'Label for the uploader',
      defaultValue: {
        summary: '\'\''
      }
    },

    accept: {
      description: 'Comma separated list of unique file type specifiers. Maps to \'accept\' attribute of native input type=file element',
      defaultValue: {
        summary: null
      }
    },

    value: {
      table: {
        disable: true
      }
    },

    // event
    input: {
      table: {
        disable: true
      }
    }
  }

}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasUploader },
  template:
    '<qas-uploader v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  entity: 'posts/image',
  label: 'image',
  accept: '.jpeg,.jpg,.png'
}
