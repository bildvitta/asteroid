<template>
  <q-page class="container q-py-lg">
    <qas-actions-menu :delete-props="{ entity: 'users' }" label="configurações" :list="list" />

    <qas-btn hide-label-on-small-screen icon="o_delete" label="bbb">aaaaa</qas-btn>

    <div>Com template:</div>
    <qas-actions-menu label="configurações" :list="list">
      <template #delete>
        aqui o delete
      </template>
    </qas-actions-menu>
  </q-page>
</template>

<script>
export default {
  computed: {
    list () {
      return {
        delete: {
          icon: 'o_delete',
          label: 'Delete',
          handler: () => alert('handler ativado')
        }
      }
    }
  }
}
</script>
