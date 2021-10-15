<template>
  <div class="qas-list-items shadow-primary">
    <q-list bordered class="round rounded-borders" dense separator>
      <q-item v-for="(item, index) in list" :key="index" v-ripple :clickable="!useIconRedirect" :to="redirect(item)">
        <slot :index="index" :item="item" name="item">
          <q-item-section>
            <slot :index="index" :item="item" name="item-section-left" />
          </q-item-section>

          <q-item-section side>
            <slot :index="index" :item="item" name="item-section-side">
              <qas-btn flat round :to="getRedirectPaylod(item)">
                <q-icon v-bind="icon" />
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
    icon: {
      type: Object,
      default: () => ({
        name: 'o_chevron_right',
        color: 'primary'
      })
    },

    list: {
      type: Array[Object],
      default: () => []
    },

    redirectKey: {
      type: String,
      default: 'uuid'
    },

    useIconRedirect: {
      type: Boolean
    },

    to: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    redirect (item) {
      return this.useIconRedirect ? undefined : this.getRedirectPaylod(item)
    },

    getRedirectPaylod (item) {
      return {
        params: { [this.redirectKey]: item[this.redirectKey] },
        ...this.to
      }
    }
  }
}
</script>

<style lang="scss">
.qas-list-items {
  .q-list--dense > .q-item, .q-item--dense {
    padding: 24px 16px;
  }
}
</style>
