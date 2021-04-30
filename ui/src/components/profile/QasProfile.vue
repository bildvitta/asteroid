<template>
  <component :is="tag">
    <div class="q-col-gutter-md row">
      <div class="col-lg-5 col-xs-12">
        <div class="no-wrap q-col-gutter-md" :class="directionClasses">
          <div class="justify-center lg:q-mb-none md:q-mr-lg row xs:q-mb-md">
            <qas-avatar :image="userAvatarImage" rounded :size="getAvatarSize" :title="title" />
          </div>
          <slot>
            <h6 class="text-bold text-h6">{{ title }}</h6>
            <div v-if="subtitle">{{ subtitle }}</div>
          </slot>
        </div>
      </div>
      <slot name="grid">
        <qas-grid-generator class="col-lg-7 col-xs-12 items-center" :columns="columns" :fields="filterObject(fields, list)" hide-empty-result :result="result" />
      </slot>
    </div>
  </component>
</template>

<script>
import filterObject from '../../helpers/filter-object'
import screen from '../../mixins/screen'
import QasAvatar from '../avatar/QasAvatar'
import QasBox from '../box/QasBox'
import QasGridGenerator from '../grid-generator/QasGridGenerator'

export default {
  components: {
    QasAvatar,
    QasBox,
    QasGridGenerator
  },

  mixins: [screen],

  props: {
    columns: {
      type: Object,
      default: () => ({})
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    hideStatus: {
      type: Boolean
    },

    list: {
      type: Array,
      default: () => ([])
    },

    result: {
      type: Object,
      default: () => ({})
    },

    subtitle: {
      type: String,
      default: ''
    },

    tag: {
      type: String,
      default: 'qas-box'
    },

    title: {
      type: String,
      default: '',
      required: true
    }
  },

  computed: {
    directionClasses () {
      return this.$_untilMedium ? 'col' : 'row items-center'
    },

    userAvatarImage () {
      return this.result.image
    },

    getAvatarSize () {
      return this.$_isSmall ? '145px' : '188px'
    }
  },

  methods: {
    filterObject
  }
}
</script>
