<template>
  <qas-btn :color="props.color" data-cy="filters-btn" icon="sym_r_tune" variant="tertiary">
    <q-menu ref="menu" anchor="center right" class="full-width" max-width="270px" self="top right">
      <div v-if="props.loading" class="q-pa-xl text-center">
        <q-spinner color="grey" size="2em" />
      </div>

      <div v-else-if="props.error" class="q-pa-xl text-center">
        <q-icon color="negative" name="sym_r_warning" size="2em" />
      </div>

      <q-form v-else class="q-gutter-y-md q-pa-md" @submit.prevent="emits('filter')">
        <div v-for="(field, index) in props.fields" :key="index">
          <qas-field v-model="filters[field.name]" :data-cy="`filters-${field.name}-field`" :field="field" v-bind="props.fieldsProps[field.name]" />
        </div>

        <qas-actions gutter="sm" use-equal-width>
          <template #primary>
            <qas-btn class="full-width" data-cy="filters-submit-btn" label="Filtrar" type="submit" variant="primary" />
          </template>
          <template #secondary>
            <qas-btn class="full-width" data-cy="filters-clear-btn" label="Limpar" variant="secondary" @click="emits('clear')" />
          </template>
        </qas-actions>
      </q-form>
    </q-menu>
  </qas-btn>
</template>

<script setup>
import { computed, ref } from 'vue'
import QasActions from '../../actions/QasActions.vue'
import QasBtn from '../../btn/QasBtn.vue'
import QasField from '../../field/QasField.vue'

defineOptions({ name: 'PvFiltersButton' })

defineExpose({ hideMenu })

const props = defineProps({
  color: {
    type: String,
    default: 'grey-9',
    validator: value => ['grey-9', 'primary', 'white'].includes(value)
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

  modelValue: {
    default: () => ({}),
    type: Object
  }
})

const emits = defineEmits(['clear', 'filter', 'update:modelValue'])

const menu = ref(null)

const filters = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    return emits('update:modelValue', value)
  }
})

// Utilizado externamente para fechar o menu
function hideMenu () {
  menu.value.hide()
}
</script>
