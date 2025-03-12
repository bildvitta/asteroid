<template>
  <qas-btn data-cy="filters-btn" icon="sym_r_filter_alt" label="Filtrar" :use-label-on-small-screen="false" variant="tertiary">
    <q-menu ref="menu" anchor="center right" class="full-width" max-width="270px" v-bind="menuProps" no-refocus self="top right">
      <div v-if="loading" class="q-pa-xl text-center">
        <q-spinner color="grey" size="2em" />
      </div>

      <div v-else-if="error" class="q-pa-xl text-center">
        <q-icon color="negative" name="sym_r_warning" size="2em" />
      </div>

      <q-form v-else class="q-gutter-y-md q-pa-md" @submit.prevent="$emit('filter')">
        <div v-for="(field, index) in fields" :key="index">
          <qas-field v-model="filters[field.name]" :data-cy="`filters-${field.name}-field`" :field="field" v-bind="fieldsProps[field.name]" />
        </div>

        <qas-actions gutter="sm" use-equal-width>
          <template #primary>
            <qas-btn class="full-width" data-cy="filters-submit-btn" label="Filtrar" type="submit" variant="primary" />
          </template>

          <template #secondary>
            <qas-btn class="full-width" data-cy="filters-clear-btn" label="Limpar" variant="secondary" @click="$emit('clear')" />
          </template>
        </qas-actions>
      </q-form>
    </q-menu>
  </qas-btn>
</template>

<script>
import QasActions from '../../actions/QasActions.vue'
import QasBtn from '../../btn/QasBtn.vue'
import QasField from '../../field/QasField.vue'

export default {
  name: 'PvFiltersButton',

  components: {
    QasActions,
    QasBtn,
    QasField
  },

  props: {
    color: {
      type: String,
      default: 'grey-10',
      validator: value => ['grey-10', 'primary', 'white'].includes(value)
    },

    error: {
      type: Boolean
    },

    fields: {
      default: () => ({}),
      type: Object
    },

    fieldsProps: {
      default: () => ({}),
      type: Object
    },

    loading: {
      type: Boolean
    },

    menuProps: {
      default: () => ({}),
      type: Object
    },

    modelValue: {
      default: () => ({}),
      type: Object
    }
  },

  emits: ['clear', 'filter', 'update:modelValue'],

  computed: {
    filters: {
      get () {
        return this.modelValue
      },

      set (value) {
        return this.$emit('update:modelValue', value)
      }
    }
  },

  methods: {
    hideMenu () {
      this.$refs.menu.hide()
    }
  }
}
</script>
