import { Dialog } from 'quasar'
import QasDialog from '../../components/dialog/QasDialog.vue'

/**
 * @param {object} componentProps={}
 *
 * @example Dialog({ card: { title: 'Esse é o meu titulo!' } })
 */
export default (componentProps = {}) => {
  return Dialog.create({
    component: QasDialog,
    componentProps: { ...componentProps, usePlugin: true }
  })
}
