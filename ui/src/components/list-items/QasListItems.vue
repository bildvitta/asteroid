<template>
  <div class="qas-list-items shadow-primary">
    <q-list bordered class="rounded-borders" separator>
      <q-item v-for="(item, index) in list" :key="index" v-ripple :clickable="!redirectOnIcon" :to="redirect(item)">
        <slot :index="index" :item="item" name="item">
          <q-item-section>
            <slot :index="index" :item="item" name="item-section-left" />
          </q-item-section>

          <q-item-section v-if="useSectionActions" side>
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
  name: 'QasListItems',

  components: {
    QasBtn
  },

  props: {
    iconProps: {
      default: () => ({ color: 'primary', name: 'o_chevron_right' }),
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

    redirectOnIcon: {
      default: true,
      type: Boolean
    },

    to: {
      default: () => ({}),
      type: Object
    },

    useSectionActions: {
      default: true,
      type: Boolean
    }
  },

  methods: {
    getRedirectPayload (item) {
      return {
        params: { [this.redirectKey]: item[this.redirectKey] },
        ...this.to
      }
    },

    redirect (item) {
      return this.redirectOnIcon ? undefined : this.getRedirectPayload(item)
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
