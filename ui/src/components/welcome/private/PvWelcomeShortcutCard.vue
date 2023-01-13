<template>
  <component :is="component.is" v-bind="component.props" class="bg-white column pv-welcome-shortcut-card q-pa-md rounded-borders shadow-2 text-no-decoration text-primary">
    <q-icon class="q-pr-xs" :name="shortcut.icon" size="md" />

    <div class="q-mt-md text-subtitle1">
      {{ shortcut.title }}
    </div>
  </component>
</template>

<script>
export default {
  name: 'PvWelcomeShortcutCard',

  props: {
    shortcut: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    isExternal () {
      return !!this.shortcut.externalLink
    },

    component () {
      return {
        is: this.isExternal ? 'a' : 'router-link',
        props: {
          ...(!this.isExternal && { to: this.shortcut.to }),
          ...(this.isExternal && { href: this.shortcut.externalLink })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.pv-welcome-shortcut-card {
  border: 2px solid transparent;
  display: block;
  height: 100%;
  min-height: 124px;
  transition: border-color var(--qas-generic-transition), color var(--qas-generic-transition);
  word-wrap: break-word;

  &:hover {
    border-color: var(--q-primary-contrast);
    color: var(--q-primary-contrast) !important;
  }

  @media (max-width: $breakpoint-xs) {
    min-width: 154px;
  }
}
</style>
