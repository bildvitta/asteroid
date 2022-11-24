import handleProcess from '../helpers/handle-process'

export default {
  computed: {
    mx_isEditMode () {
      return ['replace', 'update'].includes(this.mx_mode)
    },

    mx_mode () {
      const editModeType = handleProcess(() => process.env.EDIT_MODE_TYPE, 'replace')

      return this.$route?.name?.endsWith('Edit') ? editModeType : 'create'
    }
  }
}
