<template>
  <div class="app-select-list-dialog full-width">
    <header class="flex items-center justify-between no-wrap">
      <qas-label v-bind="labelProps" />

      <qas-btn
        v-bind="defaultAddButtonProps"
        @click="toggleDialog"
      />
    </header>

    <div
      v-if="props.description"
      class="q-mt-md text-body1 text-grey-8"
    >
      {{ props.description }}
    </div>

    <qas-box
      v-if="hasBox"
      class="q-mt-md relative-position"
    >
      <span class="text-grey-9 text-subtitle1">
        {{ props.listLabel }}
      </span>

      <q-list
        class="app-select-list-dialog__list q-mt-md"
        separator
      >
        <q-item
          v-for="(option, index) in selectedOptions"
          :key="option.value"
          class="q-px-none text-body1 text-grey-8"
        >
          <q-item-section>
            {{ option.label }}
          </q-item-section>

          <q-item-section avatar>
            <qas-btn v-bind="getDestroyButtonProps({ index, option })" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-inner-loading :showing="props.loading">
        <q-spinner
          color="grey"
          size="2em"
        />
      </q-inner-loading>
    </qas-box>

    <span
      v-if="hasError"
      class="app-select-list-dialog__error"
    >
      {{ errorMessage }}
    </span>
  </div>

  <qas-dialog
    v-bind="defaultDialogProps"
    v-model="showDialog"
  >
    <template #description>
      <slot name="dialog-description">
        <div class="q-mb-xl text-center">
          {{ props.dialogDescription }}
        </div>

        <qas-select-list
          v-model="listModel"
          v-bind="defaultSelectListProps"
        />
      </slot>
    </template>
  </qas-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'QasSelectListDialog' })

const props = defineProps({
  addButtonProps: {
    type: Object,
    default: () => ({})
  },

  description: {
    type: String,
    default: ''
  },

  disable: {
    type: Boolean
  },

  error: {
    type: [String, Array],
    default: ''
  },

  list: {
    type: Array,
    default: () => []
  },

  dialogProps: {
    type: Object,
    default: () => ({})
  },

  dialogDescription: {
    type: String,
    default: ''
  },

  options: {
    type: Array,
    default: () => []
  },

  label: {
    type: String,
    default: ''
  },

  listLabel: {
    type: String,
    default: ''
  },

  loading: {
    type: Boolean
  },

  modelValue: {
    type: Array,
    default: () => []
  },

  selectListProps: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:list', 'add'])

const hasError = computed(() => Array.isArray(props.error) ? !!props.error.length : !!props.error)
const errorMessage = computed(() => Array.isArray(props.error) ? props.error.join(' ') : props.error)

const {
  listModel,
  showDialog,

  defaultDialogProps,
  defaultSelectListProps,

  toggleDialog
} = useSelectDialog()

const {
  selectedOptions,

  hasBox,

  add,
  destroyAll,
  destroy,
  getDestroyButtonProps
} = useList()

defineExpose({ add, destroyAll, destroy })

const defaultAddButtonProps = computed(() => {
  return {
    icon: 'sym_r_add',
    useLabelOnSmallScreen: false,
    ...props.addButtonProps,
    disable: props.disable,
    loading: props.loading
  }
})

const labelProps = computed(() => {
  return {
    label: props.label,
    margin: 'none',
    color: hasError.value ? 'negative' : 'grey-9'
  }
})

const value = ref([...props.modelValue])

watch(() => props.modelValue, newValue => {
  value.value = [...newValue]
})

function updateModel () {
  emit('update:modelValue', value.value)
}

// ------------------------- composable functions ------------------------------
function useList () {
  const filteredOptions = ref(props.options)

  const selectedOptions = computed(() => {
    const options = []

    value.value.forEach(value => {
      const option = filteredOptions.value.find(option => option.value === value)

      if (option) return options.push(option)

      options.push({ label: value })
    })

    return options
  })

  watch(() => props.options, options => {
    filteredOptions.value = options
  })

  const hasBox = computed(() => hasFilteredOptions.value || props.loading)
  const hasFilteredOptions = computed(() => value.value.length)

  function add ({ options = [], model }) {
    const normalizedItems = Array.isArray(options) ? options : [options]

    filteredOptions.value.push(...normalizedItems)

    value.value.push(...(model || normalizedItems.map(item => item.value)))

    updateModel()
  }

  function destroyAll () {
    value.value = []

    updateModel()
  }

  function destroy ({ uuid }) {
    const index = value.value.findIndex(item => item === uuid)

    if (~index) value.value.splice(index, 1)

    updateModel()
  }

  function getDestroyButtonProps ({ index, option }) {
    return {
      color: 'grey-9',
      icon: 'sym_r_delete',
      variant: 'tertiary',
      disable: props.disable || !!option.disable,
      onClick: () => destroy({ index, uuid: option.value })
    }
  }

  return {
    filteredOptions,
    selectedOptions,

    hasBox,
    hasFilteredOptions,

    add,
    destroyAll,
    destroy,
    getDestroyButtonProps
  }
}

function useSelectDialog () {
  const showDialog = ref(false)
  const listModel = ref([])

  const defaultDialogProps = computed(() => {
    return {
      useFullMaxWidth: true,

      ...props.dialogProps,

      onBeforeShow: event => {
        resetListModel()

        props.dialogProps.onBeforeShow && props.dialogProps.onBeforeShow(event)
      },

      ok: {
        label: 'Adicionar',

        disable: !listModel.value.length,

        ...props.dialogProps.ok,

        onClick: onAdd
      }
    }
  })

  const defaultSelectListProps = computed(() => {
    return {
      emitValue: false,
      ...props.selectListProps,

      searchBoxProps: {
        height: '160px',
        useLazyLoading: true,
        ...props.selectListProps.searchBoxProps,

        optionsToExclude: value.value
      }
    }
  })

  function toggleDialog () {
    showDialog.value = !showDialog.value
  }

  function resetListModel () {
    listModel.value = []
    emit('update:list', [])
  }

  function onAdd () {
    if (listModel.value.length) add({ options: listModel.value })
  }

  return {
    listModel,
    showDialog,

    defaultDialogProps,
    defaultSelectListProps,

    toggleDialog
  }
}
</script>

<style lang="scss">
.app-select-list-dialog {

  .q-item {
    @include set-typography($body1)
  }

  // simulando q-field--error
  &__error {
    padding-top: var(--qas-spacing-sm);
    color: var(--q-negative) !important;
    font-size: 12px;
  }

  &__list {
    max-height: 250px;
    overflow-y: auto;
  }
}
</style>
