<template>
  <q-page class="justify-center row" padding>
    <q-list class="list" dense>
      <div class="q-mb-md text-h4">Test pages</div>

      <q-item v-for="page in pages" :key="page.path" :to="page.path">
        <q-item-section avatar>
          <q-icon name="o_pages" />
        </q-item-section>

        <q-item-section>{{ page.title }}</q-item-section>

        <q-item-section side>
          <q-icon name="o_chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import pages from '../router/pages'

export default {
  computed: {
    pages () {
      return pages
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  max-width: 100%;
  width: 700px;
}
</style>
