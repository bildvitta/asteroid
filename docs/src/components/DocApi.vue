<template>
  <q-card bordered class="q-my-lg" flat>
    <q-toolbar>
      <doc-card-title :title="name" />

      <q-space />

      <q-input borderless dense input-class="text-right" placeholder="Buscar..." type="search">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <q-linear-progress v-if="isLoading" color="brand-primary" indeterminate />

    <template v-else>
      <q-separator />

      <q-tabs v-model="currentTab" align="left" :breakpoint="0" class="doc-api__tabs" dense indicator-color="brand-primary" no-caps>
        <q-tab v-for="(tab, key) in tabs" :key="`tab-${key}`" :name="key">
          <div class="items-center no-wrap row">
            <span class="text-weight-medium">{{ tab }}</span>
            <q-badge v-if="filteredApi[key].length" class="q-ml-sm" color="brand-primary" :label="filteredApi[key].length" />
          </div>
        </q-tab>
      </q-tabs>

      <q-tab-panels v-model="currentTab" animated>
        <q-tab-panel v-for="(tab, key) in tabs" :key="`panel-${key}`" class="q-pa-none" :name="key">
          <doc-api-entry :api="filteredApi[key].results" />
        </q-tab-panel>
      </q-tab-panels>

      <!-- <q-separator />

      <div class="q-pa-md">
        <component :is="name" class="doc-api__component" v-bind="componentProps" />
      </div> -->
    </template>
  </q-card>
</template>

<script>
export default {
  props: {
    file: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      api: {},
      currentTab: '',
      isLoading: false,
      tabs: {}
    }
  },

  computed: {
    componentProps () {
      const api = this.api?.props || {}
      const props = {}

      for (const key in api) {
        props[key] = api[key].sample || api[key].default || undefined
      }

      return props
    },

    filteredApi () {
      const api = {}

      for (const key in this.api) {
        api[key] = {
          results: this.api[key],
          length: Object.keys(this.api[key]).length
        }
      }

      return api
    }
  },

  mounted () {
    this.loadFile()
  },

  methods: {
    loadFile () {
      this.isLoading = true

      import(
        /* webpackChunkName: 'asteroid-api' */
        /* webpackMode: 'lazy-once' */
        `asteroid-components/${this.file}.yml`
      ).then(api => {
        this.isLoading = false
        this.parseApiFile(api.default)
      })
    },

    parseApiFile (api) {
      const tabs = {
        props: 'Props',
        slots: 'Slots',
        events: 'Eventos',
        methods: 'Métodos'
      }

      for (const key in tabs) {
        if (api[key] && Object.keys(api[key]).length) {
          this.api[key] = api[key]
          this.tabs[key] = tabs[key]
        }
      }

      this.currentTab = Object.keys(this.tabs)[0]
    }
  }
}
</script>

<style lang="scss">
.doc-api {
  &__tabs {
    background: $grey-3;
    color: $grey-7;
  }

  &__component {
    position: relative;
  }
}
</style>
