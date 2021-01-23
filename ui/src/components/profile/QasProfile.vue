<template>
  <div>
    <div class="items-center row">
      <div v-if="showAvatar" class="col-12 col-md-auto q-mb-sm q-mr-lg">
        <qas-avatar :icon="icon" :image="image" size="70px" :title="avatarTitle" />
      </div>

      <div class="col-12 col-md-auto">
        <div class="wrap">
          <div v-if="hasBeforeTitle" class="text-grey-6">
            <!-- TODO: Remover camelCase. -->
            <slot name="beforeTitle" />
          </div>

          <h2 class="q-my-none text-black text-h5">{{ title }}</h2>

          <div v-if="hasAfterTitle" class="text-grey-6">
            <!-- TODO: Remover camelCase. -->
            <slot name="afterTitle" />
          </div>
        </div>
      </div>

      <div v-if="hasMeta" class="col items-center no-wrap q-ml-lg row">
        <q-separator class="q-mr-lg" vertical />

        <div class="q-py-lg">
          <slot name="meta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QasAvatar from '../avatar/QasAvatar'

export default {
  components: {
    QasAvatar
  },

  props: {
    icon: {
      default: '',
      type: String
    },

    iconic: {
      default: false,
      type: Boolean
    },

    image: {
      default: '',
      type: String
    },

    title: {
      default: '',
      required: true,
      type: String
    }
  },

  computed: {
    avatarTitle () {
      return this.iconic ? '' : this.title
    },

    hasAfterTitle () {
      return !!this.$slots.afterTitle
    },

    hasBeforeTitle () {
      return !!this.$slots.beforeTitle
    },

    hasMeta () {
      return !!this.$slots.meta
    },

    showAvatar () {
      return this.iconic ? this.$q.screen.gt.sm : true
    }
  }
}
</script>
