<template>
  <component :is="tag">
    <div class="q-col-gutter-md row">
      <div class="col-lg-5 col-xs-12">
        <div class="no-wrap q-col-gutter-md" :class="infoDirectionClass">
          <div class="lg:q-mb-none md:q-mr-lg xs:q-mb-md xs:text-center">
            <div class="inline-block">
              <qas-avatar :image="userAvatarImage" rounded :size="avatarSize()" :title="userName" />
            </div>
          </div>
          <div>
            <q-badge v-if="showStatus(result.status, hideStatus)" class="badge-radius-xs" :color="setStatusLabel(result.status, 'color')" :label="setStatusLabel(result.status, 'label')" />
            <h6 class="text-bold text-h6">{{ userName }}</h6>
            <!-- <div v-if="!hideType">{{  }}</div> -->
          </div>
        </div>
      </div>
      <qas-grid-generator class="col-lg-7 col-xs-12 items-center" :columns="infoColumns" :fields="filterObject(fields, infoList)" hide-empty-result :result="result">
        <template #field-privateKey>
          <div class="text-bold">Chave privada</div>
          <qas-copy :label="result.privateKey" />
        </template>
        <template v-if="shortenDescription" #field-description>
          <div class="text-bold">Descrição</div>
          <div>
            <span :class="shortenString">{{ result.description }}</span>
            <span v-if="showSeeMore()" class="cursor-pointer text-primary" @click="openDialog"> Ver mais </span>
          </div>
        </template>
      </qas-grid-generator>
      <qas-dialog v-model="showDialog" :cancel="false" :card="cardDialog" :ok="false">
        <template #header>
          <div class="justify-between row">
            <div class="text-bold text-subtitle1">Descrição</div>
            <qas-btn v-close-popup dense flat icon="close" rounded />
          </div>
        </template>
      </qas-dialog>
    </div>
  </component>
</template>

<script>
import { setStatusLabel, showStatus } from '../../helpers/status'
import avatarSize from '../../helpers/avatar-size'
import filterObject from '../../helpers/filter-object'

import screen from '../../mixins/screen'

export default {
  mixins: [screen],

  props: {
    result: {
      type: Object,
      default: () => ({})
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    infoList: {
      type: Array,
      default: () => ([])
    },

    infoColumns: {
      type: Object,
      default: () => ({})
    },

    hideStatus: {
      type: Boolean
    },

    hideType: {
      type: Boolean
    },

    tag: {
      type: String,
      default: 'qas-box'
    },

    shortenDescription: {
      type: Boolean
    }
  },

  data () {
    return {
      showDialog: false
    }
  },

  computed: {
    infoDirectionClass () {
      return this.$_untilMedium ? 'col' : 'row items-center'
    },

    userAvatarImage () {
      return this.result.kind?.image
    },

    userName () {
      return this.result.nickname || this.result.name
    },

    cardDialog () {
      return {
        description: this.result.description
      }
    },

    shortenString () {
      return this.showSeeMore() && 'ellipsis'
    }
  },

  methods: {
    avatarSize,

    filterObject,

    setStatusLabel,

    showStatus,

    isEmployee (kind) {
      return kind === 'employee'
    },

    openDialog () {
      this.showDialog = true
    },

    showSeeMore () {
      return this.result.description?.length > 10
    }
  }
}
</script>
