<template>
  <q-toolbar class="justify-between q-mb-xl q-px-none qas-page-header">
    <div class="ellipsis">
      <q-toolbar-title v-if="title" class="text-bold text-h3">
        {{ title }}
      </q-toolbar-title>

      <q-breadcrumbs v-if="useBreadcrumbs" class="text-caption" gutter="xs" separator-color="grey-8">
        <q-breadcrumbs-el v-if="useHomeIcon" class="qas-page-header__breadcrumbs-el" :class="getBreadcrumbsClass(0)" icon="home" to="/" />

        <q-breadcrumbs-el v-for="(item, index) in normalizedBreadcrumbs" :key="item.label" class="qas-page-header__breadcrumbs-el" :class="getBreadcrumbsClass(index)" :label="item.label" :to="item.route" />
      </q-breadcrumbs>

      <!-- <pre>
        {{ transformedBreadcrumbs }}
      </pre>

      <pre>
        {{ normalizedBreadcrumbs }}
      </pre> -->
    </div>
    <slot />
  </q-toolbar>
</template>

<script>
import { castArray } from 'lodash-es'
import { useHistory } from '../../composables'
import { createMetaMixin } from 'quasar'

const { history } = useHistory()

export default {
  name: 'QasPageHeader',

  mixins: [
    createMetaMixin(function () {
      return {
        title: this.title
      }
    })
  ],

  props: {
    breadcrumbs: {
      default: '',
      type: [Array, String]
    },

    root: {
      default: '',
      type: [Object, String]
    },

    title: {
      default: '',
      type: String
    },

    useBreadcrumbs: {
      default: true,
      type: Boolean
    },

    useHomeIcon: {
      default: true,
      type: Boolean
    }
  },

  computed: {
    transformedBreadcrumbs () {
      const list = [...castArray(this.breadcrumbs || this.title)]
      this.root && list.unshift(this.root)

      return list.map(item => {
        if (item && typeof item === 'string') {
          return { label: item }
        }

        if (!item.route && item.routeName) {
          item.route = { name: item.routeName }
        }

        const historyList = history.list

        if (historyList.length && item?.route?.name) {
          const previous = historyList.find(history => history.name === item.route.name)
          item.route.query = previous ? previous.query : null
        }

        return item
      })
    },

    normalizedBreadcrumbs () {
      const [first, second] = this.transformedBreadcrumbs
      const last = this.transformedBreadcrumbs[this.transformedBreadcrumbs.length - 1]

      return [
        first,
        second,
        { label: '...' },
        last
      ]
    }
  },

  methods: {
    getBreadcrumbsClass (index) {
      const lastIndex = this.normalizedBreadcrumbs.length - 1

      return lastIndex === index ? 'text-primary' : 'text-grey-8'
    }
  }
}
</script>

<style lang="scss">
.qas-page-header {
  &__breadcrumbs-el {
    .q-breadcrumbs__el-icon {
      font-size: 16px;
    }
  }
}
</style>
