<template>
  <div class="doc-link q-mb-sm row">
    <router-link class="doc-link__router-link text-no-decoration" :target="newTab" :to="to">
      <a v-if="href" class="doc-link__router-link" :href="href" target="_blank">
        <div class="bg-grey-4 cursor-pointer flex items-center justify-between q-gutter-x-sm q-pa-md rounded-borders">
          <div>
            {{ title }}
            <div class="text-bold">
              {{ name }}
            </div>
          </div>
          <div>
            <q-icon class="doc-link__router-link-icon" name="open_in_new" size="25px" />
          </div>
        </div>
      </a>

      <div v-else class="bg-grey-4 cursor-pointer flex items-center justify-between q-gutter-x-sm q-pa-md rounded-borders">
        <div>
          {{ title }}
          <div class="text-bold">
            {{ name }}
          </div>
        </div>
        <div>
          <q-icon class="doc-link__router-link-icon" name="open_in_new" size="20px" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    },

    href: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    }
  },

  computed: {
    newTab () {
      return this.href ? '_blank' : ''
    }
  }
}

</script>

<style lang="scss">
.doc-link {
  &__router-link {
    color: black;
    min-width: 200px;
    text-decoration: none;

    &:hover {
      color: $primary;
    }

    &-icon:hover {
      color: $primary;
    }
  }
}
</style>
