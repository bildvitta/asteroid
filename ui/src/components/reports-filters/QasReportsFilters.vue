<template>
  <div>
    <qas-box
      v-if="!isFetchingFilters"
      class="q-mb-lg"
    >
      <div class="q-mb-md">
        <qas-label
          label="Filtros"
          margin="xs"
        />

        <div class="text-body1">
          {{ props.description }}
        </div>
      </div>

      <q-form
        v-if="hasSettledDefaultFilters"
        class="items-center q-col-gutter-y-md row"
        @submit="filter"
      >
        <div class="col-12">
          <qas-form-generator
            v-model="model"
            :fields="filtersFields"
            v-bind="props.formGeneratorProps"
          />
        </div>

        <div class="col-12 text-right">
          <qas-btn
            :disabled="isDisabledButton"
            icon="sym_r_east"
            label="Filtrar"
            type="submit"
          />
        </div>
      </q-form>
    </qas-box>

    <q-inner-loading :showing="isFetchingFilters">
      <q-spinner
        color="grey"
        size="3em"
      />
    </q-inner-loading>
  </div>
</template>

<script setup>
import { camelize, decamelizeKeys, decamelize } from 'humps'
import { computed, onMounted, ref, inject } from 'vue'
import { parseValue } from '../../helpers'
import useContext from '../../composables/use-context'
// import { parseValue, promiseHandler, useContext, camelizeFieldsName } from 'asteroid'
import { useRoute, useRouter } from 'vue-router'
// import { getState } from '@bildvitta/store-adapter'

defineOptions({ name: 'QasReportsFilters' })

const props = defineProps({
  formGeneratorProps: {
    type: Object,
    default: () => ({})
  },

  description: {
    type: String,
    default: ''
  },

  entity: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  useDefaultFilters: {
    type: Boolean,
    default: true
  },

  useFormErrors: {
    type: Boolean
  }
})

// globals
const qas = inject('qas')

// composables
const route = useRoute()
const router = useRouter()
const { context } = useContext()

// models
const model = defineModel({ default: () => ({}), type: Object })
const defaultFilters = defineModel('defaultFilters', { default: () => ({}), type: Object })
// const hasFetched = defineModel('hasFetched', { type: Boolean })
const hasInitialFilter = defineModel('hasInitialFilter', { type: Boolean })

// consts
const hasQuery = !!Object.keys(route.query).length

// refs
const isFetchingFilters = ref(false)

/**
 * se "props.useDefaultFilters" for true, o padrão vem do endpoint caso não
 * tenha query na URL.
 */
const hasSettledDefaultFilters = ref(props.useDefaultFilters ? false : !hasQuery)

// computed
/**
 * "name" vem em snake_case então é necessário converter para camelCase.
 */
const filtersFields = computed(() => qas.getGetter({ entity: props.entity, key: 'filters' }))
// const filtersFields = computed(() => camelizeFieldsName(store.value?.filters || {}))

/**
 * Só habilita o botão de filtrar se:
 * - Todos os campos obrigatório foram preenchidos
 * - Não tem erros no formulário
 */
const isDisabledButton = computed(() => {
  if (props.useFormErrors || !Object.keys(filtersFields.value).length) return true

  for (const key in filtersFields.value) {
    if (filtersFields.value[key]?.required && !hasValue(model.value?.[key])) return true
  }

  return false
})

// lifecycle
onMounted(async () => {
  // copia a query para não alterar a URL (deep clone).
  const query = { ...route.query }

  // carrega o store de acordo com a entity
  // await loadStore()

  // recupera os filtros do endpoint.
  await fetchFilters()

  // Se existir query, então seta os valores na model.
  if (hasQuery) setModelByQuery(query)

  // Se "props.useDefaultFilters" for true, então seta os valores default que vem no endpoint dos fields.
  if (props.useDefaultFilters) await setDefaultModel(query)

  // Se o botão estiver habilitado, então existe o filtro inicial.
  setHasInitialFilter(!isDisabledButton.value)
})

// async function loadStore () {
//   console.log(qas, '<--- qas')
//   // // Transforma a entity de camelCase para kebab-case
//   // const decamelizedEntity = decamelize(props.entity, { separator: '-' })

//   // // Importa dinamicamente a store
//   // const useStore = await import(`stores/modules/reports/${decamelizedEntity}`)

//   // // Seta minha store
//   // store.value = useStore.default()
// }

async function fetchFilters () {
  const response = await qas.getAction({ entity: props.entity, key: 'fetchFilters', payload: context.value })

  console.log(response, '<-- response')
  // const { filters } = context.value

  // const { error } = await promiseHandler(
  //   store.value.fetchFilters({ url: props.url, params: filters }),
  //   {
  //     errorMessage: 'Não conseguimos buscar as informações. Por favor, tente novamente em alguns minutos.',
  //     useLoading: false,
  //     onLoading: value => {
  //       isFetchingFilters.value = value
  //     }
  //   }
  // )

  // if (error) return

  // hasFetched.value = true
}

/**
 * Adiciona os valores da query na model.
 */
function setModelByQuery (query) {
  const booleanQueryValues = ['true', 'false']

  for (const key in query) {
    const camelizedKey = camelize(key)
    const field = filtersFields.value[camelizedKey]
    const value = query[key]

    if (!value) continue

    const isBooleanValue = field?.type === 'boolean' || booleanQueryValues.includes(value)

    // Valores booleanos na query são strings, então é necessário fazer a conversão.
    const normalizedValue = isBooleanValue ? parseValue(value) : value

    /**
     * Quando o campo é multiple e existe apenas o valor na query, é necessário
     * transformar o valor em um array, exemplo:
     *
     * URL: ?status=succeeded
     *
     * A query retorna: { status: 'succeeded' }
     *
     * Deveria ser: { status: ['succeeded'] }
     *
     * Então é feito essa conversão.
     */
    model.value[camelizedKey] = field?.multiple && !Array.isArray(value) ? [value] : normalizedValue
  }

  setHasSettledDefaultFilters(true)
}

/**
 * Adiciona os valores default nos campos da model caso não existam na query.
 */
async function setDefaultModel (query) {
  for (const key in filtersFields.value) {
    const decamelizeKey = decamelize(key)
    const field = filtersFields.value[key]

    if (!hasValue(field.default)) continue

    defaultFilters.value[key] = field.default

    if (!query[decamelizeKey]) {
      model.value[key] = field.default
    }
  }

  await filter()

  setHasSettledDefaultFilters(true)
}

async function filter () {
  const query = { ...decamelizeKeys({ ...route.query, ...model.value }) }

  // Remove os campos que estão vazios, para não poluir a URL.
  for (const key in query) {
    query[key] ?? delete query[key]
  }

  await router.push({ query })

  setHasInitialFilter(!isDisabledButton.value)
}

function setHasInitialFilter (value) {
  hasInitialFilter.value = value
}

/**
 * USado para saber se os filtros default já foram aplicados e assim renderizar
 * o formulário, se não fizer isto, os endpoints de lazyloading são chamados
 * duas vezes e removendo os filtros default.
 */
function setHasSettledDefaultFilters (value) {
  hasSettledDefaultFilters.value = value
}

/**
 * Valores como null, '', 0 são considerados falsy, mas não undefined, então
 * é necessário fazer essa verificação.
 *
 * @param value {any} - Valor a ser verificado
 */
function hasValue (value) {
  return value !== undefined
}
</script>
