<template>
  <q-toolbar class="justify-between q-mb-lg q-px-none">
    <div class="ellipsis">
      <q-toolbar-title v-if="title" class="text-bold text-h5">
        <q-icon v-if="hasPreviousRoute" class="cursor-pointer vertical-baseline" name="o_arrow_back" size="18px" @click="back" />
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
import { history, getPreviousRoute } from '../../store/history'

export default {
  name: 'QasPageHeader',

  props: {
    breadcrumbs: {
      default: '',
      type: [Array, Boolean, String]
    },

    useBreadcrumbs: {
      default: true,
      type: Boolean
    },

    root: {
      default: '',
      type: [Object, String]
    },

    title: {
      default: '',
      type: String
    }
  },

  computed: {
    hasPreviousRoute () {
      return history.hasPreviousRoute
    },

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
    back () {
      this.$router.push(getPreviousRoute(this.$route))
    },

    getBreadcrumbsClass (index) {
      const lastIndex = this.transformedBreadcrumbs.length - 1

      return lastIndex === index ? 'text-grey-7' : 'text-primary'
    }
  },

  meta () {
    return {
      title: this.title
    }
  }
}
</script>
