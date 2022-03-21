<template>
  <!-- Descartar essa div -->
  <div class="container spaced">
    <qas-list-view :entity="entity">
      <template #filter>
        <qas-filters :entity="entity">
          <template #default="{ filter, removeFilter }">
            <div class="q-pt-md text-center">
              <qas-btn @click="filter({ test: 'Nova query' })">Adicionar uma nova query na url!</qas-btn>
              <qas-btn @click="removeFilter({ name: 'test' })">Remover query da url!</qas-btn>
            </div>
          </template>
        </qas-filters>
      </template>
      <template #default="{ results }">
        <div class="overflow-hidden">
          Valor filtrado: <pre>{{ results }}</pre>
        </div>
      </template>
    </qas-list-view>
  </div>
</template>

<script>
export default {
  name: 'UsersList',

  computed: {
    entity () {
      return 'users'
    }
  }
}
</script>
