<template>
  <q-btn class="q-mx-md" v-bind="$attrs" dense icon="apps" round unelevated>
    <q-menu anchor="bottom middle" max-width="400px" self="top middle">
      <div class="q-col-gutter-md q-pa-md row">
        <!-- TODO rever se é desta forma mesmo que é para deixar os links -->
        <a v-for="(app, index) in apps" :key="index" class="col-6 col-sm-4 flex justify-center text-undecoration" :href="app.href">
          <div>
            <q-avatar class="q-m-x-auto" :size="avatarSize">
              <img :alt="app.label" class="rounded-borders" :src="app.image">
            </q-avatar>
          </div>

          <div class="full-width q-mt-xs text-black text-center">{{ app.label }}</div>
        </a>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
    apps: {
      default: () => [],
      type: Array
    }
  },

  computed: {
    avatarSize () {
      return this.isExtraSmallScreen ? '50px' : '70px'
    },

    isExtraSmallScreen () {
      return this.$q.screen.xs
    }
  }
}
</script>
