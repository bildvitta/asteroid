<template>
  <div>
    <q-tree ref="tree" v-bind="treeProps" node-key="uuid" :nodes="parsedNodes" @lazy-load="onLazyLoad">
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

            <qas-tree-form v-if="useFormView" :form-generator-props="formGeneratorProps" :form-view-props="formViewProps" />

            <!-- <app-complement-fields v-if="hasComplementFieldsComponent" ref="complementFields" :custom-id="nodeToBeUpdated.uuid" @submit-success="onSubmitComplementFields" /> -->
          </div>
          <div v-else>
            <qas-input v-model="singleModel.label" autofocus label="Nome do ramo" outlined :rules="[required]" />
          </div>
        </div>
      </template>
    </qas-dialog>
    <!-- <pre>{{ parsedNodes }}</pre> -->
    <!-- <pre>{{ nodes }}</pre> -->
  </div>
</template>

<script>
import destroyNestedChildrenByKey from '../../helpers/destroy-nested-children-by-key.js'
import findChildrenByKey from '../../helpers/find-children-by-key.js'
import promiseHandler from '../../helpers/promise-handler.js'
// import promiseHandler from 'src/helpers/promise-handler'
import { extend } from 'quasar'
import axios from 'axios'
import { required } from '../../helpers/rules.js'

import QasTreeForm from './QasTreeForm.vue'

axios.defaults.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5M2Y1MmRlMC0xYmViLTQ2ODYtODZiOC0xMjdjMWNjZDIzNGYiLCJqdGkiOiJiODg3YmM2NzkzZjJhODBiN2Q3NTc0YjE4YjVkODM4ZGM3M2M3OTA0ZjExOTkwMzA3M2NlYWJjMDYyMGQ4YWNjMDQyZDk5MGY0Y2ZiMDU0NCIsImlhdCI6MTY2Mzg1NTY0NC4zODc5MTUsIm5iZiI6MTY2Mzg1NTY0NC4zODc5MTksImV4cCI6MTY5NTM5MTY0NC4zNTUwNTksInN1YiI6IjI4Iiwic2NvcGVzIjpbInByb2ZpbGUiXX0.cTx11wKhSengthAzQpOjpuLCBpNTC9tOIn0VHCrF5XR4hhOBD2R7Eb18IIgaHQR8N-hL8U2caosA0Y4wvi9JB-wdrBMPR2QQHbiKhMmYK0JC1VOU_oBCxsA27YfUkMcrNzXzjcdItjesWeLU_-i5TieRi7JDmAOIHYPP2U2EyTxIfrl-eHSeHsp9I38ez8TpgoQZaqof6RnqABmy3R_TJ-E31QenuuTAAMN98m_eHGy04LKwccCfy2veRvDDlN9tozP5ImAuSPoN4Sk692LveKj1jrW_BkSw-0m9eVumOXbFZI7QM_8dNBRXCq6JHLMguDNpsihegBRHdhLuPQidkbcnST77-RmW0pRo803IHeBraeKVuoLfg2MDEoUGiIMUZM-Xj-JQvdcVgwS0C2quxtof5GMqElzGhafVk5J4Y1f6kolSbi38OnNwcs7qnw7uh4vsjiFl_viNOHCBmlMN7QZzzYf1w3LOjJF06JCg6QnQx-ghF3nqvVxMxjUimMe--cd5k2S8oW43dqQJf8b52uoygxS2ik2yuCZR0gfPkQ5Cdk5iDF-C-T6pL3ua_AhSyKP3UswPPWFF04GpbKxdC4cPObTNbkDxGs4EZfLpfNU4jQS1g7o-_U45N_j1a--F4KEzk3ljj7Rgj9swbO0F2S_pAf7FdBelydW4HrumepI'

// import AppComplementFields from './AppComplementFields.vue'

export default {
  name: 'QasTreeGenerator',

  components: {
    QasTreeForm
  },

  props: {
    modelValue: {
      type: Array,
      default: () => []
    },

    treeProps: {
      type: Object,
      default: () => ({})
    },

    resource: {
      type: String,
      default: ''
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
    },

    formGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    formViewProps: {
      type: Object,
      default: () => ({})
    },

    labelKey: {
      type: String,
      default: 'label'
    },

    useFormView: {
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
      nodeToBeUpdated: {},
      currentNode: {},
      showFormDialog: false,
      nestedModel: [],
      singleModel: { label: '' },
      editModel: '',
      isAdd: true,
      parsedNodes: []
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
          onClick: this.resetCurrentNode
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

      return this.currentNode.label || 'ramo'
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

    hasAddInput () {
      return this.isAdd || true
      // return this.useComplementFields ? this.isAdd : true
    },

    messages () {
      return {
        error: 'Ops! Erro ao salvar item.',
        success: 'Item salvo com sucesso!'
      }
    }
  },

  watch: {
    modelValue: {
      handler (value, oldValue) {
        // se o uuid atual for igual ao uuid antigo significa que que o model atualizou internamente
        if (value?.[0]?.uuid === oldValue?.[0]?.uuid) return

        this.nodes = extend(true, [], value)
        this.setInitialValue()
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    required,

    handleTreeFormDialog (node, isAdd) {
      this.showFormDialog = !this.showFormDialog
      this.isAdd = !!isAdd
      this.currentNode = node

      if (!this.isAdd) {
        this.editModel = node.label
      }
    },

    async add () {
      const { data, error } = await promiseHandler(
        this.nestedModel.map(({ label }) => {
          return axios.post(`http://localhost:8002/api/${this.resource}`, { parent: this.currentNode.uuid, [this.labelKey]: label })
        }),
        {
          successMessage: this.messages.success,
          errorMessage: this.messages.error
        }
      )

      if (error) return

      const nestedResponse = data.map(response => {
        const { result } = response.data
        const { name, uuid } = result

        return {
          label: name,
          lazy: true,
          uuid
        }
      })

      // Precisa abrir antes de adicionar para casos de ramos que ainda não foram abertos.
      this.$refs.tree.setExpanded(this.currentNode.uuid, true)

      if (this.currentNode.children) {
        this.currentNode.children.push(...nestedResponse)
      } else {
        this.currentNode.children = [...nestedResponse]
      }

      this.$nextTick(() => this.$refs.tree.setExpanded(this.currentNode.uuid, true))

      this.updateModelValue()
    },

    async edit () {
      const { uuid } = this.currentNode

      const { error } = await promiseHandler(
        axios.put(
          `http://localhost:8002/api/${this.resource}/${uuid}`,
          {
            [this.labelKey]: this.editModel,
            uuid,
            lazy: true,
            building_system: '58c453e5-6e97-40f5-b4ab-7e6799078161' // TODO: remover
          }
        ),
        {
          successMessage: this.messages.success,
          errorMessage: this.messages.error
        }
      )

      if (error) return

      this.currentNode.label = this.editModel
      this.$refs.tree.setExpanded(uuid, true)

      this.updateModelValue()
    },

    onDestroy (children) {
      this.showDestroyDialog = !this.showDestroyDialog
      this.currentNode = children
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

      this.currentNode.destroyed = true
      destroyNestedChildrenByKey(this.parsedNodes)
      this.updateModelValue()
    },

    resetCurrentNode () {
      // this.nodeToBeDestroyed = {}
      this.currentNode = {}
    },

    resetModels () {
      this.nestedModel = [{ label: '' }]
      this.singleModel = {}
      this.editModel = ''
    },

    updateModelValue () {
      return this.$emit('update:modelValue', extend(true, [], this.parsedNodes))
    },

    async handleValidation (isValid) {
      if (isValid) {
        // if (this.useComplementFields && !this.isAdd) {
        //   this.$refs.complementFields.submit()
        //   return
        // }

        // espera requisição finalizar para poder adicionar/editar
        this.isAdd ? await this.add() : await this.edit()
      }

      this.showFormDialog = !isValid
    },

    /*
    * neste método pode ser implementado uma logica para receber os nós da árvore parcialmente
    * utilizando chamadas de API.
    */
    onLazyLoad ({ key, done }) {
      // retorna um proximo nó caso exista.
      return done(this.findNextNode(this.nodes, key, true) || [])
    },

    setInitialValue () {
      const { children, ...payload } = { ...this.modelValue?.[0] }
      this.parsedNodes = Object.keys(payload).length ? [payload] : []
    },

    findNextNode (list, key, deleteMode) {
      const children = findChildrenByKey(list, 'uuid', key)?.children

      if (!children?.length) return []

      // retorna um proximo nó caso exista.
      return (extend(true, [], children).map(item => {
        if (deleteMode) {
          delete item.children
        }

        return item
      }))
    },

    onSubmitComplementFields ({ data: { result: { name } } }) {
      // const node = findChildrenByKey(this.nodes, 'uuid', this.currenNode.uuid)
      // const parsedNode = findChildrenByKey(this.parsedNodes, 'uuid', this.currenNode.uuid)

      // parsedNode.label = name
      // node.label = name

      this.showFormDialog = false
    }
  }
}
</script>
