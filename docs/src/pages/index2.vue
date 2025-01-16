<template>
  <doc-page>
    <h2>index 2</h2>

    <qas-select-filter />

    <qas-btn label="index" to="/" />
  </doc-page>
</template>

<script>
import { version } from 'asteroid'
import packageInfo from '../../package.json'

import { setDefaultFiltersBeforeEnter } from '../../../ui/src/composables/use-filter-select'

export default ({
  beforeRouteEnter: (...context) => {
    console.log('quantas vezes eu cai aqui?')
    setDefaultFiltersBeforeEnter(...context)
  },

  data () {
    return {
      filterQuery: {}
    }
  },

  // beforeRouteUpdate: setDefaultFilterQuery,

  computed: {
    version () {
      return `Asteroid - v${version}`
    },

    quasarVersion () {
      const version = packageInfo.dependencies.quasar.replace('^', '')

      return `Quasar - v${version}`
    }
  },

  created () {
    console.log('Fui chamado apenas 1x no created.')
    // // this.filterQuery = useFilterQuery()

    // setTimeout(() => {
    //   this.filterQuery.setFilterQuery('disabled', 'status')
    // }, 3000)
  }
})
</script>
