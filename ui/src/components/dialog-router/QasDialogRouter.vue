<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="full-width" style="max-width: 80vw;">
      <q-card-section>
        <component :is="component" v-if="component" dialog :route="route" @hide="hide" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { markRaw } from 'vue'
import { Loading, extend } from 'quasar'
import { NotifyError } from '../../plugins'

export default {
  name: 'QasDialogRouter',

  emits: ['error', 'hide'],

  data () {
    return {
      component: null,
      parentRoute: '',
      route: null
    }
  },

  methods: {
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      if (history && this.parentRoute) {
        history.replaceState(null, null, this.parentRoute)
      }

      this.component = ''
      this.parentRoute = ''
      this.route = null

      this.$emit('hide')
    },

    resolveRoute (path) {
      return this.$router.resolve(path)
    },

    async show (route) {
      this.parentRoute = this.$route.fullPath
      this.route = this.resolveRoute(route)

      if (history) {
        history.replaceState(null, null, this.route.fullPath)
      }

      try {
        Loading.show()

        const component = markRaw(
          extend(true, {}, [...this.route.matched].pop().components.default)
        )

        if (typeof component.value !== 'function') {
          this.component = component
          this.$refs.dialog.show()
        } else {
          const componentFn = (await component()).default
          this.component = componentFn

          this.$refs.dialog.show()
        }
      } catch (error) {
        NotifyError('Ops! Erro ao carregar item.')
        this.$emit('error', error)
      } finally {
        Loading.hide()
      }
    }
  }
}
</script>
