<template>
  <qas-btn dense icon="o_apps" round>
    <q-popup-proxy anchor="bottom middle" max-width="400px" self="top middle">
      <div class="bg-white q-col-gutter-sm q-pa-sm row">
        <div v-for="(app, index) in apps" :key="index" class="col-6 col-sm-4">
          <q-btn class="full-width q-pa-sm" flat :href="app.href" no-caps type="a">
            <q-img :alt="app.label" class="rounded-borders" :src="app.image" />
            <div class="q-mt-xs">{{ app.label }}</div>
          </q-btn>
        </div>
      </div>
    </q-popup-proxy>
  </qas-btn>
</template>

<script>
export default {
  props: {
    apps: {
      default: () => [],
      type: Array
    }
  }
}
</script>
