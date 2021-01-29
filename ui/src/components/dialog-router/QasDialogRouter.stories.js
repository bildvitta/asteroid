import VueRouter from 'vue-router'

import QasBtn from '../btn/QasBtn.vue'
import QasDialogRouter from './QasDialogRouter.vue'

export default {
  component: QasDialogRouter,
  title: 'Components/DialogRouter',

  parameters: {
    docs: {
      description: {
        component: 'Open an Vue component (like a page) inside [QDialog](https://quasar.dev/vue-components/dialog).'
      }
    }
  },

  argTypes: {
    hide: {
      description: 'Controls dialog\'s visibility.'
    }
  }
}

// TODO: Fazer um mock de componente na rota para o exemplo funcionar.
const Template = (args, { argTypes }) => ({
  components: { QasBtn, QasDialogRouter },
  props: Object.keys(argTypes),
  router: new VueRouter(),
  template:
    `<div>
      <qas-btn label="Open dialog" @click="$refs.dialog.show('')" />
      <qas-dialog-router ref="dialog" v-bind="$props" />
    </div>`
})

export const Default = Template.bind({})
Default.args = {}
