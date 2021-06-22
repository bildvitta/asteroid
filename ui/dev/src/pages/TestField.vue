<template>
  <div>
    <qas-field v-model="model" :field="field" :options="field.options">
      <template #append>
        Selecione um empreendimento.
      </template>
      <template #option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
            <q-item-label caption>{{ scope.opt.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </qas-field>
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: true
    }
  },

  computed: {
    field () {
      return {
        type: 'select',
        name: 'test',
        options: [
          {
            label: 'Teste 1',
            value: 1,
            description: 'Torre 1, bloco 2'
          },
          {
            label: 'Teste 2',
            value: 2,
            description: 'Torre 1, bloco 3'
          }
        ]
      }
    }
  }
}
</script>
