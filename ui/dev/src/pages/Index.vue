<template>
  <q-page class="justify-center row" padding>
    <q-list class="list" dense>
      <div class="q-mb-md text-h4">Test pages</div>
      <q-item
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
      >
        <q-item-section avatar>
          <q-icon name="sym_r_pages" />
        </q-item-section>
        <q-item-section>
          {{ page.label }}
        </q-item-section>
        <q-item-section side>
          <q-icon name="sym_r_chevron_right" />
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
