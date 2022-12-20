<template>
  <q-toolbar class="justify-between q-mb-lg q-px-none">
    <div class="ellipsis">
      <q-toolbar-title v-if="title" class="text-bold text-h5">
        {{ title }}
      </q-toolbar-title>

      <q-breadcrumbs v-if="useBreadcrumbs" class="text-caption" separator-color="grey-7">
        <q-breadcrumbs-el v-for="(item, index) in transformedBreadcrumbs" :key="item.label" :class="getBreadcrumbsClass(index)" :label="item.label" :to="item.route" />
      </q-breadcrumbs>
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
    }
  },

  methods: {
    getBreadcrumbsClass (index) {
      const lastIndex = this.transformedBreadcrumbs.length - 1

      return lastIndex === index ? 'text-grey-7' : 'text-primary'
    }
  }
}
</script>
