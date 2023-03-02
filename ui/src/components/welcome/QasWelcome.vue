<template>
  <div class="q-mb-xl qas-welcome text-left">
    <h3 class="text-grey-9 text-h3">
      {{ welcomeMessage }}<span v-if="firstName">, {{ firstName }}</span>
    </h3>

    <div class="text-caption text-grey-8">{{ currentDay }}</div>

    <div v-if="hasShortcuts">
      <div class="q-mb-md q-mt-md text-grey-9 text-subtitle2">Atalhos</div>

      <div class="qas-welcome__container">
        <div ref="scrollArea" class="row" :class="contentClasses">
          <div v-for="(shortcut, index) in shortcuts" :key="index" :class="shortcutClasses">
            <pv-welcome-shortcut-card :shortcut="shortcut" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PvWelcomeShortcutCard from './private/PvWelcomeShortcutCard.vue'

import { date } from 'quasar'
import dateConfig from '../../shared/date-config.js'

export default {
  name: 'QasWelcome',

  components: {
    PvWelcomeShortcutCard
  },

  props: {
    name: {
      default: '',
      type: String
    },

    shortcuts: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    contentClasses () {
      return this.$qas.screen.isSmall
        ? 'no-wrap overflow-hidden-y q-gutter-x-md q-pb-md q-pt-xs qas-welcome__scroll-area'
        : 'q-col-gutter-md'
    },

    currentDay () {
      const timestamp = Date.now()
      const { daysList, monthsList } = dateConfig

      // exemplo: Quarta-feira, 11 de janeiro de 2023
      return date.formatDate(
        timestamp, 'dddd, D [de] MMMM [de] YYYY', { days: daysList, months: monthsList }
      )
    },

    firstName () {
      if (!this.name) return ''

      return this.name.split(' ')?.[0]
    },

    hasShortcuts () {
      return !!this.shortcuts.length
    },

    shortcutClasses () {
      return !this.$qas.screen.isSmall && 'col-3 col-lg-2'
    },

    welcomeMessage () {
      const today = new Date()
      const time = date.formatDate(today, 'HH:mm')

      if (time >= '05:00' && time < '11:59') return 'Bom dia'

      if (time >= '12:00' && time < '18:59') return 'Boa tarde'

      return 'Boa noite'
    }
  }
}
</script>

<style lang="scss">
.qas-welcome {
  &__scroll-area {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > *:last-child {
      margin-right: var(--qas-spacing-sm);
    }
  }
}
</style>