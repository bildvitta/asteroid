<!-- TODO: componente adaptado somente para o uso do QasUploader, precisa ser revisitado para ser implementado no QasGallery -->
<template>
  <div class="bg-white q-pa-md qas-gallery-card rounded-borders shadow-2" :class="classes">
    <header class="flat items-center no-wrap q-mb-md row" :class="headerClasses">
      <slot name="header">
        <div class="ellipsis q-mr-xs qas-gallery__name">
          <slot v-if="card.name" name="name">
            {{ card.name }}
          </slot>
        </div>

        <div v-if="hasActionsMenu">
          <qas-actions-menu v-bind="defaultActionsMenuProps" />
        </div>
      </slot>
    </header>

    <div class="qas-gallery-card__image">
      <slot name="image">
        <q-img class="rounded-borders" height="100%" :src="card.url" v-bind="imageProps">
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

    card: {
      type: Object,
      default: () => ({})
    },

    disable: {
      type: Boolean
    },

    gridGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    imageProps: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    classes () {
      return {
        'text-grey-6': this.disable
      }
    },

    defaultActionsMenuProps () {
      const { buttonProps } = this.actionsMenuProps

      return {
        useLabel: false,
        ...this.actionsMenuProps,

        buttonProps: {
          disable: this.disable,
          ...buttonProps
        }
      }
    },

    hasActionsMenu () {
      return !!Object.keys(this.actionsMenuProps).length
    },

    hasBottom () {
      return !!this.$slots.bottom || this.hasGridGenerator
    },

    hasGridGenerator () {
      return !!Object.keys(this.gridGeneratorProps).length
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

<style lang="scss">
.qas-gallery-card {
  &__image {
    height: 180px;
  }
}
</style>
