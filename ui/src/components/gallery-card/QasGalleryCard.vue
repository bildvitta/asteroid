<template>
  <div class="bg-white q-pa-md rounded-borders shadow-2" :class="classes">
    <header class="flat items-center no-wrap q-mb-md q-mb-xs row" :class="headerClasses">
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

    <div style="height: 180px;">
      <slot name="image">
        <q-img class="rounded-borders" height="180px" :src="card.url" v-bind="imageProps">
          <template #default>
            <slot name="image-default" />
          </template>

          <template #error>
            <slot name="image-error" />
          </template>
        </q-img>
      </slot>
    </div>

    <div v-if="hasBottom" class="q-mt-md">
      <slot name="bottom">
        <qas-grid-generator v-if="hasGridGenerator" v-bind="gridGeneratorProps" />
      </slot>
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

    disable: {
      type: Boolean
    },

    formGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    card: {
      type: Object,
      default: () => ({})
    },

    imageProps: {
      type: Object,
      default: () => {}
    },

    gridGeneratorProps: {
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

    hasGridGenerator () {
      return !!Object.keys(this.gridGeneratorProps).length
    },

    classes () {
      return {
        'text-grey-6': this.disable
      }
    },

    headerClasses () {
      return {
        'justify-between': this.card.name,
        'justify-right': !this.card.name,
        'text-grey-9': !this.disable
      }
    }
  }
}
</script>
