<template>
  <!-- <qas-btn data-cy="filters-btn" icon="sym_r_filter_alt" label="Filtrar" :use-label-on-small-screen="false" variant="tertiary">
    <q-menu ref="menu" anchor="center right" class="full-width" max-width="270px" v-bind="menuProps" no-refocus self="top right">
      <div v-if="props.loading" class="q-pa-xl text-center">
        <q-spinner color="grey" size="2em" />
      </div>

      <div v-else-if="props.error" class="q-pa-xl text-center">
        <q-icon color="negative" name="sym_r_warning" size="2em" />
      </div>

      <q-form v-else class="q-gutter-y-md q-pa-md" @submit.prevent="$emit('filter')">
        <div v-for="(field, index) in props.fields" :key="index">
          <qas-field v-model="filters[field.name]" :data-cy="`filters-${field.name}-field`" :field="field" v-bind="props.fieldsProps[field.name]" />
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
  </qas-btn> -->

  <div>
    <qas-btn data-cy="filters-btn" icon="sym_r_filter_alt" label="Filtrar" :use-label-on-small-screen="false" variant="tertiary" @click="toggleDrawer" />

    <qas-drawer v-model="showDrawer" v-bind="drawerProps">
      <div>
        <div v-if="props.loading" class="q-pa-xl text-center">
          <q-spinner color="grey" size="2em" />
        </div>

        <div v-else-if="props.error" class="q-pa-xl text-center">
          <q-icon color="negative" name="sym_r_warning" size="2em" />
        </div>

        <q-form v-else class="q-gutter-y-md q-pa-md" @submit.prevent="emit('filter')">
          <!-- <div v-for="(field, index) in props.fields" :key="index">
            <qas-field v-model="filtersModel[field.name]" :data-cy="`filters-${field.name}-field`" :field="field" v-bind="props.fieldsProps[field.name]" />
          </div> -->

          <qas-form-generator v-model="filtersModel" columns="12" :fields="props.fields" :fields-props="props.fieldsProps" />

          <qas-actions class="q-mt-xl" gutter="sm">
            <template #primary>
              <qas-btn class="full-width" data-cy="filters-submit-btn" label="Filtrar" type="submit" variant="primary" />
            </template>

            <template #secondary>
              <qas-btn class="full-width" data-cy="filters-clear-btn" label="Limpar" variant="secondary" @click="emit('clear')" />
            </template>
          </qas-actions>
        </q-form>
      </div>
    </qas-drawer>
  </div>
</template>

<script setup>
import QasActions from '../../actions/QasActions.vue'
import QasBtn from '../../btn/QasBtn.vue'

import { ref } from 'vue'

defineOptions({ name: 'PvFiltersDrawer' })

const props = defineProps({
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
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['clear', 'filter'])

const filtersModel = defineModel({ type: Object, default: () => ({}) })

defineExpose({
  hideMenu
})

// refs
const showDrawer = ref(false)

// const
const drawerProps = {
  title: 'Filtrar',
  position: 'right',
  maxWidth: '480px'
}

// functions
function toggleDrawer () {
  showDrawer.value = !showDrawer.value
}

function hideMenu () {
  toggleDrawer()
}
</script>
