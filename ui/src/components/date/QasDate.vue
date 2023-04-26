<template>
  <q-date
    v-model="model"
    v-bind="attributes"
  />
</template>

<script>
import { date } from 'quasar'
import { date as asteroidDate } from '../../helpers/filters'

const MaskOptions = {
  Dash: 'YYYY-MM-DD',
  Slash: 'YYYY/MM/DD'
}

export default {
  name: 'QasDate',

  props: {
    events: {
      type: [Array, Function],
      default: () => []
    },

    mask: {
      type: String,
      default: MaskOptions.Dash,
      validator: value => Object.values(MaskOptions).includes(value)
    },

    modelValue: {
      type: String,
      default: ''
    },

    options: {
      type: [Array, Function],
      default: undefined
    },

    useIso: {
      type: Boolean
    },

    useUnmaskEvent: {
      default: true,
      type: Boolean
    },

    useUnmaskOption: {
      default: true,
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

  computed: {
    attributes () {
      return {
        ref: 'date',
        color: 'white',
        class: 'qas-date shadow-2',
        textColor: 'primary',
        minimal: true,
        mask: this.mask,
        events: this.normalizedEvents,
        options: this.normalizedOptions,

        ...this.$attrs,
        onNavigation: this.onNavigation
      }
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', this.useIso ? this.getISOValue(value) : value)
      }
    },

    normalizedEvents () {
      return this.useUnmaskEvent ? this.getUnmaskedList(this.events) : this.events
    },

    normalizedOptions () {
      return this.useUnmaskOption ? this.getUnmaskedList(this.options) : this.options
    }
  },

  mounted () {
    this.setNewNavigatorDisplay()
    this.setInativeEvents(this.getCurrentDate())
  },

  methods: {
    getISOValue (value) {
      if (!value) return ''

      return date.extractDate(value, this.mask).toISOString()
    },

    getUnmaskedList (list) {
      const invalidTypes = ['function', 'undefined']

      if (invalidTypes.includes(typeof list)) return list

      return list.map(dateItem => {
        return asteroidDate(dateItem, 'yyyy/MM/dd')
      })
    },

    async setInativeEvents ({ year, month }) {
      month = month - 1

      const dateElement = this.$refs.date.$el
      const inativeDays = dateElement.querySelectorAll('.q-date__calendar-item--fill')
      const inativeList = Array.from(inativeDays)

      let monthIncrement = 0

      inativeList.forEach((inativeElement, index) => {
        const [child] = inativeElement.children
        const previousDay = inativeList?.[index - 1]?.innerText || 0
        const inactiveDay = child.innerText

        if (inactiveDay < previousDay) {
          monthIncrement += 2
        }

        const normalizedMonth = Number(month) + monthIncrement
        const newDate = date.buildDate({ year, month: normalizedMonth, day: inactiveDay })
        const normalizedDate = asteroidDate(newDate, 'yyyy/MM/dd')

        const hasCallbackInactiveEvent = typeof this.events === 'function' && this.events(normalizedDate)
        const harrAyInactiveEvent = Array.isArray(this.events) && this.normalizedEvents.includes(normalizedDate)

        if (harrAyInactiveEvent || hasCallbackInactiveEvent) {
          const divElement = document.createElement('div')
          divElement.classList.add('q-date__event', 'qas-date__event-inactive')

          inativeElement.appendChild(divElement)
        }
      })
    },

    setNewNavigatorDisplay () {
      const dateElement = this.$refs.date.$el
      const navigationElement = dateElement.querySelector('.q-date__navigation')
      const navigationChildren = navigationElement?.children || []

      const nodesList = Array.from(navigationChildren)

      if (nodesList.length <= 2) return

      const firstDivElement = document.createElement('div')
      const secondDivElement = document.createElement('div')

      firstDivElement.classList.add('flex')
      secondDivElement.classList.add('flex')

      const firstList = nodesList.slice(0, 3)
      const secondList = nodesList.slice(3, 6)

      const newFirstElement = navigationElement.appendChild(firstDivElement)
      const newSecondElement = navigationElement.appendChild(secondDivElement)

      this.$nextTick(() => firstList.forEach(node => newFirstElement.appendChild(node)))
      this.$nextTick(() => secondList.forEach(node => newSecondElement.appendChild(node)))
    },

    async onNavigation (date) {
      setTimeout(() => { this.setInativeEvents(date) }, 350)

      this.$nextTick(() => this.setNewNavigatorDisplay())
    },

    getCurrentDate () {
      if (this.modelValue) {
        const [year, month, day] = this.modelValue.split(MaskOptions.Dash ? '-' : '/')

        return { year, month, day }
      }

      const date = asteroidDate(new Date(), 'yyyy/MM/dd')
      const [year, month, day] = date.split('/')

      return { year, month, day }
    }
  }
}
</script>

<style lang="scss">
.qas-date {
  // $

  .q-date__navigation > div:last-child,
  .q-date__navigation > div:first-child {
    min-width: auto;
    width: auto;
  }

  &__event-inactive {
    background-color: $grey-4;
    bottom: 4px !important;
  }

  .q-date {
    &__navigation {
      justify-content: space-between;

      .q-btn {
        @include set-button(tertiary, false, false, grey-9);
        @include set-typography($subtitle2);

        .q-icon {
          @include set-typography($subtitle1, true);
        }
      }
    }

    &__calendar-weekdays {
      color: $grey-8;

      > div {
        @include set-typography($caption);

        opacity: 1;
      }
    }

    &__calendar-item--fill {
      color: $grey-4;
      visibility: unset;
    }

    &__calendar-item--out {
      color: $grey-4;
      opacity: 1;
    }

    &__event {
      bottom: 0;
      height: 6px;
      width: 6px;
    }

    &__months,
    &__years {
      .q-btn {
        @include set-button(tertiary, true, false, grey-9);
      }
    }

    &__view {
      min-height: auto;
    }

    &__calendar-days-container {
      color: $grey-9;
      min-height: auto;

      .q-btn {
        @include set-button(tertiary, true, false);
        @include set-typography($subtitle2);
      }
    }
  }
}
</style>
