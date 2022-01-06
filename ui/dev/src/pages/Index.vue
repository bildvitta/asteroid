<template>
  <q-page padding class="row justify-center">
    <q-list dense class="list">
      <div class="text-h4 q-mb-md">Test pages</div>
      <q-item
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
      >
        <q-item-section avatar>
          <q-icon name="o_pages" />
        </q-item-section>
        <q-item-section>
          {{ page.label }}
        </q-item-section>
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
  setup () {
    return {
      pages
    }
  }
}
</script>

<style lang="sass" scoped>
.list
  width: 700px
  max-width: 100%</style>
