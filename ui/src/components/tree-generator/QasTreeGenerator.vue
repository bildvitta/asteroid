<template>
  <div>
    <q-tree ref="tree" v-bind="treeProps" node-key="uuid" :nodes="nodes" @lazy-load="onLazyLoad">
      <template #default-header="{ node, tree }">
        <div>
          <span>
            {{ node.label }}
          </span>

          <span>
            <qas-btn class="q-ml-sm" dense flat icon="o_more_vert" round @click.stop>
              <q-menu auto-close>
                <q-list separator>
                  <q-item v-ripple clickable @click="handleTreeFormDialog(node, true, tree)">
                    <q-item-section avatar>
                      <q-icon name="o_add_circle_outline" />
                    </q-item-section>
                    <q-item-section>Adicionar subnível</q-item-section>
                  </q-item>
                  <q-item v-ripple clickable @click="handleTreeFormDialog(node)">
                    <q-item-section avatar>
                      <q-icon name="o_edit" />
                    </q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>

                  <q-item v-ripple clickable @click="onDestroy(node)">
                    <q-item-section avatar>
                      <q-icon name="o_highlight_off" />
                    </q-item-section>
                    <q-item-section>Excluir</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </qas-btn>
          </span>
        </div>
      </template>
    </q-tree>

    <qas-dialog v-model="showDestroyDialog" v-bind="destroyDialogConfig" />

    <qas-dialog v-model="showFormDialog" v-bind="formDialogConfig" use-form @hide="resetModels" @validate="handleValidation">
      <template #description>
        <div>
          <div v-if="hasNodes">
            <qas-field v-if="hasAddInput" v-model="editModel" :disable="isAdd" :field="addField" :label="nodeTitle" :rules="[required]" />

            <qas-nested-fields v-if="isAdd" v-model="nestedModel" class="q-mt-md" :field="nestedFieldProp" :fields-props="fieldsProps" :form-columns="nestedColumns" :row-object="rowObject" :use-duplicate="false" use-inline-actions />

            <!-- <app-complement-fields v-if="hasComplementFieldsComponent" ref="complementFields" :custom-id="nodeToBeUpdated.uuid" @submit-success="onSubmitComplementFields" /> -->
          </div>
          <div v-else>
            <qas-input v-model="singleModel.label" autofocus label="Nome do ramo" outlined :rules="[required]" />
          </div>
        </div>
      </template>
    </qas-dialog>

    <pre>{{ nodes }}</pre>
    <pre>{{ parsedNodes }}</pre>
  </div>
</template>

<script>
import nestedField from '../../helpers/nested-fields'
import findChildrenByKey from '../../helpers/find-children-by-key'
// import promiseHandler from 'src/helpers/promise-handler'
import { extend } from 'quasar'
// import axios from 'axios'
import { required } from '../../helpers/rules.js'

// import AppComplementFields from './AppComplementFields.vue'

export default {
  name: 'AppTreeGenerator',

  // components: {
  //   AppComplementFields
  // },

  props: {
    modelValue: {
      type: Array,
      default: () => []
    },

    treeProps: {
      type: Object,
      default: () => ({})
    },

    // resource: {
    //   type: String,
    //   required: true
    // },

    useComplementFields: {
      type: Boolean
    },

    entityPermission: {
      type: String,
      default: ''
    },

    useDestroyNode: {
      type: Boolean,
      default: true
    },

    useAddNode: {
      type: Boolean,
      default: true
    },

    useEditNode: {
      type: Boolean,
      default: true
    },

    useDestroyOnFirstNode: {
      type: Boolean
    }
  },

  emits: [
    'update:modelValue'
  ],

  data () {
    return {
      nodes: [],
      nested: null,
      showDestroyDialog: false,
      nodeToBeDestroyed: {},
      nodeToBeUpdated: {},
      showFormDialog: false,
      nestedModel: [],
      singleModel: { label: '' },
      editModel: '',
      isAdd: true,
      parsedNodes: [],
      watchOnce: () => {}
    }
  },

  computed: {
    addField () {
      return { name: 'add', type: 'text', label: this.nodeTitle }
    },

    destroyDialogConfig () {
      return {
        card: {
          title: 'Excluir ramo da árvore?',
          description: 'Todas as informações serão perdidas. Deseja realmente continuar?'
        },
        ok: {
          label: 'Excluir',
          onClick: this.destroy
        },
        cancel: {
          onClick: this.resetNodeToBeDestroyed
        }
      }
    },

    formDialogConfig () {
      return {
        card: {
          title: this.isAdd ? 'Adicionar ramo' : 'Editar ramo'
        },
        ok: {
          label: 'Salvar'
        }
      }
    },

    nestedFieldProp () {
      return {
        type: 'nested',
        label: 'Adicionar itens',
        name: 'test',
        children: {
          label: {
            type: 'text',
            label: 'Adicionar um novo item',
            name: 'label'
          }
        }
      }
    },

    rowObject () {
      return { label: '' }
    },

    nestedColumns () {
      return {
        label: {
          col: 12
        }
      }
    },

    nodeTitle () {
      if (!this.isAdd) {
        return 'Nome do ramo'
      }

      return this.nodeToBeUpdated.label || 'ramo'
    },

    hasNodes () {
      return this.nodes.length
    },

    fieldsProps () {
      return {
        label: {
          rules: [required]
        }
      }
    },

    parentsList () {
      return this.nodes.map(({ uuid }) => uuid)
    },

    hasComplementFieldsComponent () {
      return this.useComplementFields && !this.isAdd
    },

    hasAddInput () {
      return this.useComplementFields ? this.isAdd : true
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        // nodes é o valor real da árvore.
        // TODO revisar com calma futuramente.
        this.nodes = extend(true, [], value)
        this.parsedNodes = extend(true, [], value)
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    required,

    handleTreeFormDialog (node, isAdd) {
      this.showFormDialog = !this.showFormDialog

      this.nodeToBeUpdated = {
        ...node,
        parsedChildrenNode: this.findNextNode(this.nodes, node?.uuid, true),
        childrenNode: this.findNextNode(this.nodes, node?.uuid)
      }

      if (!isAdd) {
        this.editModel = node.label
      }

      this.isAdd = !!isAdd
    },

    async add () {
      // ramo pai que foi criado o nó.
      const childrenNode = findChildrenByKey(this.nodes, 'uuid', this.nodeToBeUpdated?.uuid)
      const parsedChildrenNode = findChildrenByKey(this.parsedNodes, 'uuid', this.nodeToBeUpdated?.uuid)

      // const nestedModel = nestedField(this.nestedModel)

      const { data = [], error } = {}

      // const { data, error } = await promiseHandler(
      //   nestedModel.map(({ label: name }) => {
      //     return axios.post(this.resource, { parent: childrenNode.uuid, name })
      //   }),
      //   {
      //     useLoading: true,
      //     successMessage: 'Item salvo com sucesso!',
      //     errorMessage: 'Ops! Erro ao salvar item.'
      //   }
      // )

      if (error) return

      const nestedResponse = data.map(response => {
        const { result } = response.data
        const { name, uuid } = result

        return {
          label: name,
          uuid,
          lazy: true
        }
      })

      // adicionar nó diretamente no nó pai através do endereço de memória.
      childrenNode.children = [...this.nodeToBeUpdated?.childrenNode, ...nestedResponse]
      parsedChildrenNode.children = [...this.nodeToBeUpdated?.parsedChildrenNode, ...nestedResponse]

      this.$refs.tree.setExpanded(this.nodeToBeUpdated.uuid, true)

      this.emit()
      this.$forceUpdate()
    },

    async edit () {
      const node = findChildrenByKey(this.nodes, 'uuid', this.nodeToBeUpdated.uuid)
      const parsedNode = findChildrenByKey(this.parsedNodes, 'uuid', this.nodeToBeUpdated.uuid)

      // const { uuid } = parsedNode

      const { error } = {}
      // const { error } = await promiseHandler(
      //   axios.put(`${this.resource}/${uuid}`, { name: this.editModel, uuid, lazy: true }),
      //   {
      //     useLoading: true,
      //     errorMessage: 'Ocorreu um erro ao editar o ramo'
      //   }
      // )

      if (error) return

      parsedNode.label = this.editModel
      node.label = this.editModel

      this.$refs.tree.setExpanded(this.nodeToBeUpdated.uuid, true)

      this.emit()
    },

    onDestroy (children) {
      this.showDestroyDialog = !this.showDestroyDialog
      this.nodeToBeDestroyed = children
    },

    async destroy () {
      const { error } = {}
      // const { error } = await promiseHandler(
      //   axios.delete(`${this.resource}/${this.nodeToBeDestroyed.uuid}`),
      //   {
      //     useLoading: true,
      //     successMessage: 'Item deletado com sucesso!',
      //     errorMessage: 'Ops! Não foi possível deletar o item.'
      //   }
      // )

      if (error) return

      this.nodeToBeDestroyed.destroyed = true

      const node = findChildrenByKey(this.nodes, 'uuid', this.nodeToBeDestroyed.uuid)
      const parsedNode = findChildrenByKey(this.parsedNodes, 'uuid', this.nodeToBeDestroyed.uuid)

      node.destroyed = true
      parsedNode.destroyed = true
      nestedField(this.nodes)
      nestedField(this.parsedNodes)

      this.$forceUpdate()
      this.emit()
    },

    resetNodeToBeDestroyed () {
      this.nodeToBeDestroyed = {}
    },

    resetModels () {
      this.nestedModel = [{ label: '' }]
      this.singleModel = {}
      this.editModel = ''
    },

    emit () {
      return this.$emit('update:modelValue', extend(true, [], this.nodes))
    },

    async handleValidation (isValid) {
      if (isValid) {
        if (this.useComplementFields && !this.isAdd) {
          this.$refs.complementFields.submit()
          return
        }

        // espera requisição finalizar para poder adicionar/editar
        this.isAdd ? await this.add() : await this.edit()
      }

      this.showFormDialog = !isValid
    },

    onLazyLoad ({ key, done }) {
      // se existir próximo nó, retornar o próximo nó para a exibição.
      return done(this.findNextNode(this.nodes, key, true) || [])
    },

    setInitialValue () {
      // formata a árvore que o lazy-load espera.
      this.parsedNodes = (extend(true, [], [this.modelValue?.[0]]) || []).map(item => {
        const { children, ...rest } = item

        return rest
      })
    },

    findNextNode (list, key, deleteMode) {
      const children = findChildrenByKey(list, 'uuid', key)?.children

      if (!children?.length) return []

      // se existir próximo nó, retornar o próximo nó para a exibição.
      return (extend(true, [], children).map(item => {
        // if (deleteMode) {
        //   delete item.children
        // }

        return item
      }))
    },

    // TODO não esta sendo utilizado por hr, mas no futuro seria bom olhar com calma
    watchOnceModelValue () {
      this.watchOnce = this.$watch('modelValue', value => {
        if (value?.length) {
          this.setInitialValue()
          this.watchOnce()
        }
      }, { immediate: true })
    },

    onSubmitComplementFields ({ data: { result: { name } } }) {
      const node = findChildrenByKey(this.nodes, 'uuid', this.nodeToBeUpdated.uuid)
      const parsedNode = findChildrenByKey(this.parsedNodes, 'uuid', this.nodeToBeUpdated.uuid)

      parsedNode.label = name
      node.label = name

      this.showFormDialog = false
    }
  }
}
</script>
