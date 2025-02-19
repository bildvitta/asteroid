<template>
  <div class="container q-py-lg">
    <div>
      <qas-select v-model="model" :badge-props="badgeProps" label="Select com badge na option" :options="optionsWithBadge" use-custom-options />
      Model: {{ model }}

      <div class="q-mt-md">
        <qas-select v-model="model" label="Select com caption na option" :options="optionsWithCaption" use-custom-options />
        Model: {{ model }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'CustomOption' })

const model = ref('')

const badgeProps = {
  isTester: {
    color: 'grey-8',
    label: 'Tester',
    textColor: 'white'
  },

  isAvailable: value => {
    return {
      show: true,
      props: {
        color: value ? 'positive' : 'negative',
        textColor: 'white',
        label: value ? 'Disponível' : 'Inativo'
      }
    }
  }
}

const optionsWithBadge = [
  {
    label: 'Usuario 1 ',
    value: 1
  },
  {
    label: 'Usuario 2',
    value: 2,
    isTester: true,
    isAvailable: false
  },
  {
    label: 'Usuario 3',
    value: 3,
    isAvailable: true
  }
]

const optionsWithCaption = [
  {
    label: 'Usuário 1',
    value: 1,
    caption: 'CPF: 111.222.333-44'
  },
  {
    label: 'Usuário 2',
    value: 2,
    caption: ['Valor 1', 'Valor 2']
  }
]
</script>
