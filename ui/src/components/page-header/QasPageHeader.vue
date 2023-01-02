<template>
  <q-toolbar class="justify-between q-mb-xl q-px-none qas-page-header">
    <div class="ellipsis">
      <q-toolbar-title v-if="title" class="text-grey-9 text-h3">
        {{ title }}
      </q-toolbar-title>

      <q-breadcrumbs v-if="useBreadcrumbs" class="text-caption" gutter="xs" separator-color="grey-8">
        <q-breadcrumbs-el v-if="useHomeIcon" class="qas-page-header__breadcrumbs-el text-grey-8" icon="o_home" :to="homeRoute" />

        <q-breadcrumbs-el v-for="(item, index) in normalizedBreadcrumbs" :key="index" class="qas-page-header__breadcrumbs-el" :label="item.label" :to="item.route" />
      </q-breadcrumbs>
    </div>

    <slot>
      <qas-actions-menu v-if="hasDefaultActionsMenu" v-bind="actionsMenuProps" />

      <qas-btn v-if="hasDefaultButton" :use-label-on-small-screen="false" v-bind="buttonProps" />
    </slot>
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
    actionsMenuProps: {
      type: Object,
      default: () => ({})
    },

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
    },

    buttonProps: {
      default: () => ({}),
      type: Object
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
      const breadcrumbsSize = this.transformedBreadcrumbs.length

      if (breadcrumbsSize < 5) return this.transformedBreadcrumbs

      const [first, second] = this.transformedBreadcrumbs
      const last = this.transformedBreadcrumbs[this.transformedBreadcrumbs.length - 1]

      const beforeLast = {
        ...this.transformedBreadcrumbs[this.transformedBreadcrumbs.length - 2],
        label: '...'
      }

      return [
        first,
        second,
        beforeLast,
        last
      ]
    },

    hasDefaultButton () {
      return !!Object.keys(this.buttonProps).length
    },

    hasDefaultActionsMenu () {
      return !!Object.keys(this.actionsMenuProps).length
    },

    homeRoute () {
      const hasRoot = this.$router.hasRoute('Root')

      return hasRoot ? { name: 'Root' } : '/'
    }
  }
}
</script>

<style lang="scss">
.qas-page-header {
  &__breadcrumbs-el {
    transition: color var(--qas-generic-transition);

    &.q-breadcrumbs__el:not(.q-router-link--exact-active):hover {
      color: var(--qas-primary-contrast) !important;
    }

    .q-breadcrumbs__el-icon {
      font-size: 16px;
    }
  }

  // aplica cor "grey-8" a todos os .q-breadcrumbs__el que não uma classe .q-breadcrumbs--last como pai
  .q-breadcrumbs__el:not(.q-breadcrumbs--last .q-breadcrumbs__el) {
    color: $grey-8;
  }

  .q-breadcrumbs--last {
    color: var(--q-primary);
  }
}
</style>
