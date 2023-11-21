<template>
  <q-list class="doc-api-entry">
    <template v-for="(data, name) in api" :key="name">
      <q-separator v-if="!isFirstItem(name)" inset />

      <q-item>
        <q-item-section>
          <q-item-label>
            <div class="items-center row">
              <qas-btn flat :label="normalizedAPI[name].keyValue" size="sm" @click="onCopy(normalizedAPI[name].keyValue)">
                <q-tooltip self="center middle">
                  Copiar
                </q-tooltip>
              </qas-btn>

              <qas-btn v-if="hasToggleButton(name)" class="q-ml-sm" color="primary" icon="sym_r_swap_horiz" @click="onToggleCase({ name, keyValue: normalizedAPI[name].keyValue })">
                <q-tooltip self="center middle">{{ getToggleTooltipLabel(normalizedAPI[name].isCamelized) }}</q-tooltip>
              </qas-btn>
            </div>
            <q-badge v-for="item in parseTypes(data.type)" :key="item" class="doc-api-entry__item-type q-ml-xs" color="grey-4" :label="item" text-color="grey-9" />
            <span v-if="data.required" class="doc-api-entry__item-required q-ml-xs">Obrigatório</span>
            <span v-if="data.model" class="doc-api-entry__item-model q-ml-xs">Model</span>
          </q-item-label>

          <q-item-label caption>{{ data.desc }}</q-item-label>

          <q-item-label v-if="hasExamples(data.examples)">
            <div class="doc-api-entry__item-example-title q-mt-xs">Exemplos:</div>
            <q-badge v-for="(example, index) in data.examples" :key="index" class="doc-api-entry__item-example-badge q-ml-xs" color="grey-7" :label="toString(example)" outline />
          </q-item-label>

          <q-item-label v-if="getChildren(data)">
            <div class="q-mb-xs q-mt-sm text-bold text-grey-7">{{ getChildrenLabel(data) }}</div>
            <div class="doc-api-entry__children">
              <doc-api-entry :api="getChildren(data)" />
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section v-if="data.default" side top>
          <q-item-label caption class="text-grey-7">Padrão</q-item-label>
          <q-item-label v-if="data.debugger" class="doc-api-entry__item-default">
            <qas-debugger :inspect="[data.default]" />
          </q-item-label>
          <q-item-label v-else class="doc-api-entry__item-default">{{ data.default }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
import { camelize, decamelize } from 'humps'
import { copyToClipboard } from 'quasar'

export default {
  // name: 'DocApiEntry',
  inheritAttrs: false,

  props: {
    api: {
      default: () => ({}),
      type: Object
    }
  },

  data () {
    return {
      normalizedAPI: {}
    }
  },

  watch: {
    api: {
      immediate: true,
      handler (value) {
        for (const key in value) {
          this.normalizedAPI[key] = {
            ...value[key],
            isCamelized: false,
            keyValue: key
          }
        }
      }
    }
  },

  methods: {
    hasExamples (examples) {
      return examples && examples.length > 0
    },

    isFirstItem (name) {
      return Object.keys(this.api)[0] === name
    },

    parseTypes (types) {
      return this.toArray(types).sort()
    },

    toArray (content) {
      if (!content || content.length < 1) {
        return []
      }

      return Array.isArray(content) ? content : [content]
    },

    getChildren ({ scope, params }) {
      return scope || params
    },

    getChildrenLabel ({ scope, params }) {
      return scope ? 'Escopo' : params ? 'Parâmetros' : ''
    },

    toString (value) {
      const types = ['number', 'boolean']

      return types.includes(typeof value) ? String(value) : value
    },

    isMultipleWord (name) {
      return name.includes('-')
    },

    hasToggleButton (name) {
      return this.isMultipleWord(name) && !name.includes(' ')
    },

    onToggleCase ({ keyValue, name }) {
      const isCamelized = !this.isMultipleWord(keyValue)

      /**
       * Em alguns casos utilizamos a abreviação `[]` para identificar chaves dinâmicas, por exemplo
       * "form-view-cancel-btn-[entity]", por isto a necessidade do "replace('[', '-[')", uma vez que o
       * decamelize não lida com isto automaticamente.
       */
      this.normalizedAPI[name].keyValue = (
        isCamelized ? decamelize(keyValue, { separator: '-' }).replace('[', '-[') : camelize(keyValue)
      )

      this.normalizedAPI[name].isCamelized = !this.isMultipleWord(this.normalizedAPI[name].keyValue)
    },

    async onCopy (name) {
      await copyToClipboard(name)

      this.$q.notify({
        message: `"${name}" copiado para a área de transferência.`,
        position: 'top'
      })
    },

    getToggleTooltipLabel (isCamelized) {
      return isCamelized ? 'Alternar para kebab-case' : 'Alternar para camelCase'
    }
  }
}
</script>

<style lang="scss">
.doc-api-entry {
  &__item-name {
    color: $brand-primary;
    font-family: monospace;
    font-weight: bold;
    vertical-align: middle;
  }

  &__item-type {
    font-family: monospace;
    font-size: 0.7em;
  }

  &__item-required {
    color: $positive;
    font-size: 0.7em;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__item-model {
    color: $info;
    font-size: 0.7em;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__item-default {
    font-family: monospace;
  }

  &__item-example-title {
    color: $grey-7;
    display: inline-block;
    font-size: 0.8em;
  }

  &__item-example-badge {
    border-color: $grey-4;
    font-size: 0.8em;
  }

  &__children {
    border: 1px solid;
    border-color: $grey-4;
  }
}
</style>
