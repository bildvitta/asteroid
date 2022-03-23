<template>
  <div class="qas-list-items shadow-primary">
    <q-list bordered class="rounded-borders" separator>
      <q-item v-for="(item, index) in list" :key="index" v-ripple :clickable="!useIconRedirect" :to="redirect(item)">
        <slot :index="index" :item="item" name="item">
          <q-item-section>
            <slot :index="index" :item="item" name="item-section-left" />
          </q-item-section>

          <q-item-section side>
            <slot :index="index" :item="item" name="item-section-side">
              <qas-btn flat round :to="getRedirectPayload(item)">
                <q-icon v-bind="iconProps" />
              </qas-btn>
            </slot>
          </q-item-section>
        </slot>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'

export default {
  components: {
    QasBtn
  },

  props: {
    iconProps: {
      default: () => ({ name: 'o_chevron_right', color: 'primary' }),
      type: Object
    },

    list: {
      default: () => [],
      type: Array
    },

    redirectKey: {
      default: 'uuid',
      type: String
    },

    paramKey: {
      default: 'id',
      type: String
    },

    to: {
      default: () => ({}),
      type: Object
    },

    useIconRedirect: {
      type: Boolean
    }
  },

  methods: {
    redirect (item) {
      return this.useIconRedirect ? undefined : this.getRedirectPayload(item)
    },

    getRedirectPayload (item) {
      return {
        params: { [this.paramKey]: item[this.redirectKey] },
        ...this.to
      }
    }
  }
}
</script>

<style lang="scss">
.qas-list-items {
  .q-list > .q-item {
    padding: 24px 16px;
  }
}
</style>
