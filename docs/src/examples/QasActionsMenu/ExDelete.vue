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
  }
}

const list2 = {
  ...list,
  edit: {
    icon: 'sym_r_create',
    label: 'Editar',
    handler: () => alert('handler ativado')
  }
}

const deleteProps = {
  deleteActionParams: {
    entity: 'users',
    id: 'my-custom-id-from-user'
  }
}

const props = {
  list,
  splitName: 'visibility',
  deleteProps
}

const props2 = {
  list: list2,
  splitName: 'visibility',
  deleteProps
}

const props3 = {
  list: [],
  deleteProps
}

const props4 = {
  list: list2,
  deleteProps
}
</script>
