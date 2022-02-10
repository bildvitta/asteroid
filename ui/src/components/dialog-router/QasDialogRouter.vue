<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="full-width" style="max-width: 80vw;">
      <q-card-section>
        <component :is="getComponent()" v-if="getComponent()" dialog :route="route" @hide="hide" />
      </q-card-section>
    </q-card>
  </q-dialog>
  <slot :show="show" />
</template>

<script>
import { Loading, extend } from 'quasar'
import { NotifyError } from '../../plugins'

let component2 = null

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

    getComponent () {
      return component2
    },

    async show (route) {
      this.parentRoute = this.$route.fullPath
      this.route = this.resolveRoute(route)

      if (history) {
        history.replaceState(null, null, this.route.fullPath)
      }

      try {
        Loading.show()
        // const component = extend(true, {}, [...this.route.matched].pop().components.default)
        const component = [...this.route.matched].pop().components.default

        // shallowRef(component)

        if (typeof component.value !== 'function') {
          // this.component = component
          component2 = component
          console.log('🚀 ~ file: QasDialogRouter.vue ~ line 67 ~ show ~ this.component', this.component)
          this.$refs.dialog.show()
        } else {
          const componentFn = (await component()).default
          this.component = componentFn

          this.$refs.dialog.show()
        }
      } catch (error) {
        console.log(error)
        NotifyError('Ops! Erro ao carregar item.')
        this.$emit('error', error)
      } finally {
        Loading.hide()
      }
    }
  }
}
</script>
