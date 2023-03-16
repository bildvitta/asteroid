<template>
  <div class="bg-white q-pa-md rounded-borders shadow-2">
    <header class="flat items-center no-wrap q-mb-xs row text-grey-9" :class="headerClasses">
      <slot name="header">
        <div class="ellipsis q-mr-xs qas-gallery__name">
          <slot v-if="card.name">
            {{ card.name }}
          </slot>
        </div>

        <div v-if="hasActionsMenu">
          <qas-actions-menu :use-label="false" v-bind="actionsMenuProps" />
        </div>
      </slot>
    </header>

    <slot name="image">
      <q-img class="rounded-borders" height="150px" :src="card.url" />
    </slot>

    <div v-if="hasBottom" class="q-mt-md">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QasGalleryCard',

  props: {
    actionsMenuProps: {
      type: Object,
      default: () => ({})
    },

    formGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    card: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    hasActionsMenu () {
      return !!Object.keys(this.actionsMenuProps).length
    },

    hasBottom () {
      return !!this.$slots.bottom
    },

    headerClasses () {
      return this.card.name ? 'justify-between' : 'justify-right'
    }
  }
}
</script>
