<template>
  <qas-list-view class="container spaced" entity="users" no-filter>
    <template #header>
      <qas-page-header no-breadcrumbs title="Lista" />
    </template>

    <template #default="{ fields, results }">
      <qas-table-generator :columns="columns" :fields="fields" :results="results" row-key="uuid">
        <template #body-cell-actions="{ row }">
          <div class="flex justify-end no-wrap q-gutter-x-sm">
            <qas-btn dense flat label="o_visibility" rounded size="sm" :to="{ name: 'TreesSingle', params: { id: row.uuid } }" />
            <qas-btn dense flat icon="o_edit" rounded size="sm" :to="{ name: 'TreesEdit', params: { id: row.uuid } }" />
          </div>
        </template>
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script>

export default {
  computed: {
    columns () {
      return [
        'name',
        'email',
        'age',
        { align: 'right', name: 'actions' }
      ]
    }
  }
}
</script>
