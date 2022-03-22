<template>
  <q-page class="container q-pt-xl">
    <qas-list-items :list="results" :to="{ name: 'path' }" />

    <qas-label label="slot &quot;item&quot;" />
    <qas-list-items :list="results" :to="{ name: 'path' }">
      <template #item="{ item }">
        <pre>{{ item }}</pre>
      </template>
    </qas-list-items>

    <qas-label label="slot &quot;item-section-left&quot;" />
    <qas-list-items :list="results" :to="{ name: 'path' }" use-icon-redirect>
      <template #item-section-left="{ item }">
        <div>{{ item.name }}</div>
      </template>
    </qas-list-items>

    <qas-label label="slot &quot;item-section-side&quot;" />
    <qas-list-items :list="results" :to="{ name: 'path' }">
      <template #item-section-side="{ item }">
        <pre>{{ item }}</pre>
      </template>
    </qas-list-items>

    <qas-label label="Teste redirect" />
    <qas-list-items :list="results" redirect-key="uuid" :to="{ name: 'path' }">
      <template #item-section-left="{ item }">
        <div class="items-center row">
          <span class="q-mr-sm text-black text-weight-bold">{{ item.name }}</span>
        </div>
      </template>
    </qas-list-items>
  </q-page>
</template>

<script>
export default {
  name: 'TestListItems',

  computed: {
    results () {
      return [
        {
          uuid: 'test 1',
          name: 'Name 1',
          email: 'E-mail 1',
          address: 'adrress 1',
          phone: 'phone 1',
          createdAt: 'createdAt 1',
          updatedAt: 'updatedAt 1'
        },
        {
          uuid: 'test 2',
          name: 'Name 2',
          email: 'E-mail 2',
          address: 'adrress 2',
          phone: 'phone 2',
          createdAt: 'createdAt 2',
          updatedAt: 'updatedAt 2'
        },
        {
          uuid: 'test 3',
          name: 'Name 3',
          email: 'E-mail 3',
          address: 'adrress 3',
          phone: 'phone 3',
          createdAt: 'createdAt 3',
          updatedAt: 'updatedAt 3'
        },
        {
          uuid: 'test 4',
          name: 'Name 4',
          email: 'E-mail 4',
          address: 'adrress 4',
          phone: 'phone 4',
          createdAt: 'createdAt 4',
          updatedAt: 'updatedAt 4'
        }
      ]
    }
  }
}
</script>
