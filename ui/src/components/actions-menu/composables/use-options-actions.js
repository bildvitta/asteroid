import getLabel from '../utils/get-label'

import { computed } from 'vue'

/**
 * Cenário onde não é utilizado com split e tenha mais de 1 item na lista,
 * neste caso, ele se torna o botão de "opções" onde será usado em casos como
 * dentro de cards, etc.
 *
 * @param {{ color: string, props: { buttonProps: object, useLabel: boolean } }}
 */
export default function useOptionsActions ({ props, color }) {
  const buttonsList = computed(() => {
    return {
      options: {
        color,
        iconRight: 'sym_r_more_vert',
        ...props.buttonProps,
        label: getLabel({ useLabel: props.useLabel, label: 'Opções' }) // label não pode ser sobrescrita.
      }
    }
  })

  return {
    buttonsList
  }
}
