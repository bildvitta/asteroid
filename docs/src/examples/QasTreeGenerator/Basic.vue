<template>
  <div class="container spaced">
    <div>
      <qas-tree-generator v-model="nodes2" :form-generator-props="formGeneratorProps" :form-view-props="{ entity: 'treeNodes' }" label-key="name" resource="tree-nodes" :use-form-view-edit="false" />
    </div>
    <pre>{{ nodes2 }}</pre>

    <div>
      <qas-btn
        label="alterar nodes" @click="nodes2 = [
          // { label: 'Nó pai 2',
          //   uuid: 'no-pai 2',
          //   lazy: true,
          //   children: [
          //     {
          //       label: 'filho',
          //       lazy: true,
          //       uuid: 'filho'
          //     }
          //   ]
          // }
        ]"
      />
      <qas-btn
        label="alterar nodes 1" @click="nodes2 = nodes"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const normalizedNodes = [
      {
        uuid: '36389b41-f6c3-4eba-ba14-f1725b3b18c1',
        label: 'Causa Raiz',
        lazy: true,
        children: [
          {
            uuid: '65d43611-6feb-4bd8-82c7-31a1d462d5aa',
            label: 'novo item 1.1',
            lazy: true,
            children: []
          },
          {
            uuid: '434a8a9a-8a1e-4822-bdd3-a5084019e978',
            label: 'novo item 1.2',
            lazy: true,
            children: []
          }
        ]
      }
    ]

    return {
      nodes2: normalizedNodes || [
        {
          label: 'Nó pai',
          uuid: 'no-pai',
          lazy: true,
          children: [
            {
              label: 'Nó filho 1',
              uuid: 'no-filho-1',
              lazy: true,
              children: [
                {
                  label: 'Nó filho 1.1',
                  uuid: 'no-filho-1.1',
                  lazy: true,
                  children: [
                    {
                      label: 'Nó filho 1.1.1',
                      uuid: 'no-filho-1.1.1',
                      lazy: true
                    },
                    {
                      label: 'Nó filho 1.2.1',
                      uuid: 'no-filho-1.2.1',
                      lazy: true
                    },
                    {
                      label: 'Nó filho 1.3.1',
                      uuid: 'no-filho-1.3.1',
                      lazy: true
                    }
                  ]
                },
                {
                  label: 'Nó filho 1.2',
                  uuid: 'no-filho-1.2',
                  lazy: true
                },
                {
                  label: 'Nó filho 1.3',
                  uuid: 'no-filho-1.3',
                  lazy: true
                }
              ]
            },
            {
              label: 'Nó filho 2',
              uuid: 'no-filho-2'
            },
            {
              label: 'Nó filho 3',
              uuid: 'no-filho-3'
            }
          ]
        }
      ]
    }
  },

  computed: {
    formGeneratorProps () {
      return {
        columns: {
          sla: { col: 12 }
        }
      }
    },
    nodes () {
      return [
        {
          label: 'Nó pai',
          uuid: 'no-pai',
          lazy: true,
          children: [
            {
              label: 'Nó filho 1',
              uuid: 'no-filho-1',
              lazy: true,
              children: [
                {
                  label: 'Nó filho 1.1',
                  uuid: 'no-filho-1.1',
                  lazy: true,
                  children: [
                    {
                      label: 'Nó filho 1.1.1',
                      uuid: 'no-filho-1.1.1',
                      lazy: true
                    },
                    {
                      label: 'Nó filho 1.2.1',
                      uuid: 'no-filho-1.2.1',
                      lazy: true
                    },
                    {
                      label: 'Nó filho 1.3.1',
                      uuid: 'no-filho-1.3.1',
                      lazy: true
                    }
                  ]
                },
                {
                  label: 'Nó filho 1.2',
                  uuid: 'no-filho-1.2',
                  lazy: true
                },
                {
                  label: 'Nó filho 1.3',
                  uuid: 'no-filho-1.3',
                  lazy: true
                }
              ]
            },
            {
              label: 'Nó filho 2',
              uuid: 'no-filho-2'
            },
            {
              label: 'Nó filho 3',
              uuid: 'no-filho-3'
            }
          ]
        }
      ]
    }
  },

  async created () {
    const { data: { metadata: { tree_nodes: treeNodes } } } = await axios.get('http://localhost:8002/api/trees/4bcfe124-9fea-4ac7-b185-0b5061e87ced/edit')

    this.nodes2 = treeNodes

    console.log(treeNodes)
  }
}
</script>
