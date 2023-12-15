<template>
  <div>
    <q-toolbar class="justify-between q-mb-lg q-px-none qas-page-header">
      <div class="ellipsis">
        <q-toolbar-title v-if="title" class="text-grey-10 text-h3">
          {{ title }}
        </q-toolbar-title>

        <q-breadcrumbs v-if="useBreadcrumbs" class="text-caption" gutter="xs" separator-color="grey-8">
          <q-breadcrumbs-el v-if="useHomeIcon" class="qas-page-header__breadcrumbs-el text-grey-8" icon="sym_r_home" :to="homeRoute" />

          <q-breadcrumbs-el v-for="(item, index) in normalizedBreadcrumbs" :key="index" class="ellipsis inline-block qas-page-header__breadcrumbs-el" :label="item.label" :to="item.route" />
        </q-breadcrumbs>
      </div>

      <slot />
    </q-toolbar>

    <div>
      <slot name="bottom">
        <qas-header-actions v-if="hasHeaderActions" v-bind="headerActionsProps" />
      </slot>
    </div>
  </div>
</template>

<script>
import QasHeaderActions from '../header-actions/QasHeaderActions.vue'

import { castArray } from 'lodash-es'
import { createMetaMixin } from 'quasar'

export default {
  name: 'QasPageHeader',

  components: {
    QasHeaderActions
  },

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

    headerActionsProps: {
      default: () => ({}),
      type: Object
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

        return item
      })
    },

    normalizedBreadcrumbs () {
      const breadcrumbsSize = this.transformedBreadcrumbs.length

      if (breadcrumbsSize < 5) return this.transformedBreadcrumbs

      const [first, second] = this.transformedBreadcrumbs
      const last = this.transformedBreadcrumbs.at(-1)

      const beforeLast = {
        ...this.transformedBreadcrumbs.at(-2),
        label: '...'
      }

      return [
        first,
        second,
        beforeLast,
        last
      ]
    },

    hasHeaderActions () {
      return !!Object.keys(this.headerActionsProps).length
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
    max-width: 180px;
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
