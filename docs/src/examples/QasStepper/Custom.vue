<template>
  <div class="container spaced">
    <qas-stepper v-model="model">
      <template #default="{ next, previous }">
        <q-step caption="20/03/2024" :done="model > 1" icon="assignment" :name="1" title="Análise cadastral">
          <div class="q-mb-md">Conteúdo da Página 1</div>

          <div class="column items-start q-gutter-sm">
            <qas-btn label="Próximo" @click="next" />
          </div>
        </q-step>

        <q-step caption="-" :done="model > 2" icon="description" :name="2" title="Análise documental">
          <div class="q-mb-md">Conteúdo da Página 2</div>

          <div class="column items-start q-gutter-sm">
            <qas-btn label="Voltar" @click="previous" />
            <qas-btn label="Próximo" @click="next" />
          </div>
        </q-step>

        <q-step caption="-" icon="assured_workload" :name="3" title="Análise bancária">
          <div class="q-mb-md">Conteúdo da Página 3</div>

          <div class="column items-start q-gutter-sm">
            <qas-btn label="Voltar" @click="previous" />
            <qas-btn label="Próximo" @click="next" />
          </div>
        </q-step>
      </template>
    </qas-stepper>
  </div>
</template>

<script>
export default {
  name: 'Custom',

  data () {
    return {
      model: 2
    }
  }

}
</script>
