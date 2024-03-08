<template>
  <div class="container q-py-lg">
    <div>
      <qas-actions-menu v-bind="props" />
    </div>

    <div>
      <qas-actions-menu v-bind="props2" />
    </div>

    <div>
      <qas-actions-menu v-bind="props3" />
    </div>

    <div>
      <qas-actions-menu v-bind="props4" />
    </div>
  </div>
</template>

<script setup>
const list = {
  visibility: {
    icon: 'sym_r_visibility',
    label: 'Visualizar',
    handler: () => alert('handler ativado')
  },
  edit: {
    icon: 'sym_r_create',
    label: 'Editar',
    handler: () => alert('handler ativado')
  },
  person: {
    icon: 'sym_r_person',
    label: 'Perfil',
    handler: () => alert('handler ativado')
  }
}

const list2 = {
  visibility: list.visibility,
  edit: list.edit
}

const list3 = {
  visibility: list.visibility
}

const props = {
  useLabel: false,
  list,
  splitName: 'visibility'
}

const props2 = {
  useLabel: false,
  list: list2,
  splitName: 'visibility'
}

const props3 = {
  useLabel: false,
  list: list3,
  splitName: 'visibility'
}

const props4 = {
  useLabel: false,
  list
}
</script>
