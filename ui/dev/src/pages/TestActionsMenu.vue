<template>
  <q-page class="justify-center row" padding>
    <div>
      <qas-actions-menu class="q-mr-sm" hide-label icon="o_more_vert" :list="secondaryActionsList" />
      <qas-actions-menu :list="secondaryActionsList" />
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    secondaryActionsList () {
      return {
        export: {
          icon: 'o_file_download',
          handler: () => alert('OI XD'),
          label: 'Exportar Relatório'
        }
      }
    }
  }
}
</script>
