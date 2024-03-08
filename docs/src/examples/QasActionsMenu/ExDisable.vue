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
  ...list,
  visibility: {
    ...list.visibility,
    disable: true
  }
}

const list3 = {
  ...list,
  edit: {
    ...list.edit,
    disable: true
  }
}

const props = {
  disable: true,
  list,
  splitName: 'visibility'
}

const props2 = {
  list: list2,
  splitName: 'visibility'
}

const props3 = {
  list: list3,
  splitName: 'visibility'
}

const props4 = {
  list,
  disable: true
}
</script>
