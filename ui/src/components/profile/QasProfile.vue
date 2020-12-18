<template>
  <div>
    <div class="row items-center">
      <div v-if="showAvatar" class="q-mr-lg q-mb-sm col-12 col-md-auto">
        <qas-avatar :icon="icon" :image="image" size="70px" :title="avatarTitle" />
      </div>

      <div class="col-12 col-md-auto">
        <div class="wrap">
          <div v-if="hasBeforeTitle" class="text-grey-6">
            <slot name="beforeTitle" />
          </div>

          <h2 class="text-h5 text-black q-my-none">{{ title }}</h2>

          <div v-if="hasAfterTitle" class="text-grey-6">
            <slot name="afterTitle" />
          </div>
        </div>
      </div>

      <div v-if="hasMeta" class="row col items-center q-ml-lg no-wrap">
        <q-separator vertical class="q-mr-lg" />

        <div class="q-py-lg">
          <slot name="meta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

    hasMeta () {
      return !!this.$slots.meta
    },

    hasBeforeTitle () {
      return !!this.$slots.beforeTitle
    },

    hasAfterTitle () {
      return !!this.$slots.afterTitle
    },

    showAvatar () {
      return this.iconic ? this.$q.screen.gt.sm : true
    }
  }
}
</script>
