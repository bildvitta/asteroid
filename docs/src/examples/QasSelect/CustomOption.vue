<template>
  <div class="container q-py-lg">
    <div>
      <qas-select v-model="model" :badge-list="badgeList" label="Select com badge na option" :options="optionsWithBadge" use-custom-option />
      Model: {{ model }}

      <div class="q-mt-md">
        <qas-select v-model="model" label="Select com caption na option" :options="optionsWithCaption" use-custom-option />
        Model: {{ model }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'CustomOption' })

const model = ref('')

const badgeList = [
  {
    model: 'isTester',
    badgeProps: {
      color: 'blue-3',
      label: 'Tester'
    }
  },
  {
    model: 'isAvaible',
    badgeProps: {
      color: 'green-3',
      label: 'Disponível'
    }
  }
]

const optionsWithBadge = [
  {
    label: 'Opção 1',
    value: 1
  },
  {
    label: 'Opção 2',
    value: 2,
    isTester: true,
    isAvaible: false
  },
  {
    label: 'Opção 3',
    value: 3,
    isTester: true,
    isAvaible: true
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
    caption: 'CPF: 111.222.333-55'
  },
  {
    label: 'Usuário 3',
    value: 3,
    caption: 'CPF: 111.222.333-66'
  }
]
</script>
