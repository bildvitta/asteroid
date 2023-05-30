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
  Slash: 'YYYY/MM/DD',
  SlashPtBR: 'DD/MM/YYYY',
  SlashDateAndHourPtBR: 'DD/MM/YYYY HH:mm'
}

export default {
  name: 'QasDate',

  inheritAttrs: false,

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
      type: [String, Array],
      default: ''
    },

    multiple: {
      type: Boolean
    },

    options: {
      type: [Array, Function],
      default: undefined
    },

    useIso: {
      type: Boolean
    },

    useInactiveDates: {
      default: true,
      type: Boolean
    },

    useUnmaskEvents: {
      default: true,
      type: Boolean
    },

    useUnmaskOptions: {
      default: true,
      type: Boolean
    },

    width: {
      type: String,
      default: ''
    }
  },

  emits: [
    'update:modelValue',
    'navigation'
  ],

  data () {
    return {
      currentDate: {}
    }
  },

  computed: {
    attributes () {
      const {
        color,
        minimal,
        textColor,
        ...attributes
      } = this.$attrs

      return {
        class: this.classes,
        color: 'primary',
        events: this.normalizedEvents,
        mask: this.mask,
        minimal: true,
        multiple: this.multiple,
        options: this.normalizedOptions,
        ref: 'date',
        style: this.styles,
        textColor: 'white',
        eventColor: this.getEventColor,

        // events
        onNavigation: this.onNavigation,

        ...attributes
      }
    },

    classes () {
      return ['qas-date', 'shadow-2', { 'qas-date--inative': this.useInactiveDates }]
    },

    hasEvents () {
      return !!Object.keys(this.events)?.length
    },

    hasModelValue () {
      return this.multiple ? !!this.modelValue.length : !!this.modelValue
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', this.useIso ? this.getISODate(value) : value)
      }
    },

    styles () {
      return {
        ...(this.width && { width: this.width })
      }
    },

    normalizedEvents () {
      return this.useUnmaskEvents ? this.getUnmaskedList(this.events) : this.events
    },

    normalizedOptions () {
      return this.useUnmaskOptions ? this.getUnmaskedList(this.options) : this.options
    }
  },

  watch: {
    events () {
      if (this.useInactiveDates) this.setInactiveEvents(this.currentDate)
    }
  },

  mounted () {
    this.setNewNavigatorDisplay()

    if (this.useInactiveDates) {
      this.currentDate = this.getCurrentDate()
      this.setInactiveEvents(this.currentDate)
    }

    this.setQuantityEvents()
  },

  methods: {
    getCurrentDate () {
      const modelDate = this.multiple ? this.modelValue[0] : this.modelValue
      const extractedDate = this.hasModelValue ? date.extractDate(modelDate, this.mask) : new Date()

      return this.getDate(extractedDate)
    },

    getDate (date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    },

    getEventColor (currentDate) {
      if (!this.modelValue) return 'primary'

      const model = this.multiple ? this.modelValue : [this.modelValue]

      const extractedModel = model.filter(Boolean).map(dateItem => {
        const extractedDate = date.extractDate(dateItem, this.mask)
        return asteroidDate(extractedDate, 'yyyy/MM/dd')
      })

      return extractedModel.includes(currentDate) ? 'white' : 'primary'
    },

    getISODate (value) {
      if (!value || (this.multiple && !value.length)) return value

      return this.multiple
        ? value.map(dateItem => date.extractDate(dateItem, this.mask).toISOString())
        : date.extractDate(value, this.mask).toISOString()
    },

    getUnmaskedList (list) {
      const invalidTypes = ['function', 'undefined']

      return invalidTypes.includes(typeof list)
        ? list
        : list.map(dateItem => asteroidDate(dateItem, 'yyyy/MM/dd'))
    },

    async setInactiveEvents ({ year, month }) {
      if (!this.hasEvents) return

      const previousMonth = month - 1

      const dateElement = this.$refs.date.$el
      const inativeDays = dateElement.querySelectorAll('.q-date__calendar-item--fill')
      const inativeList = Array.from(inativeDays)

      let monthIncrement = 0

      inativeList.forEach((inativeElement, index) => {
        const [child] = inativeElement.children
        const previousDay = inativeList?.[index - 1]?.innerText || 0
        const inactiveDay = child.innerText

        /*
          * Se o dia anterior for 31 e o dia atual for 1, por exemplo, significa que estamos nos referindo ao próximo mês.
          * Como o mês começa no mês anterior, por exemplo, em 31 de janeiro, o mês atual seria fevereiro.
          * Portanto, o mês correspondente ao dia 1 seria março e, para alcançá-lo, seria necessário incrementar 2 meses.
        */
        if (inactiveDay < previousDay) {
          monthIncrement += 2
        }

        const normalizedMonth = previousMonth + monthIncrement
        const newDate = date.buildDate({ year, month: normalizedMonth, day: inactiveDay })
        const normalizedDate = asteroidDate(newDate, 'yyyy/MM/dd')

        const hasCallbackInactiveEvent = typeof this.events === 'function' && this.events(normalizedDate)
        const hasArrayInactiveEvent = Array.isArray(this.events) && this.normalizedEvents.includes(normalizedDate)

        if (hasArrayInactiveEvent || hasCallbackInactiveEvent) {
          const divElement = document.createElement('div')
          divElement.classList.add('q-date__event', 'qas-date__event-inactive')

          inativeElement.appendChild(divElement)
        }
      })
    },

    setQuantityEvents () {
      const dateElement = this.$refs.date.$el
      const eventsDays = dateElement.querySelectorAll('.q-date__event')
      const eventsList = Array.from(eventsDays)

      eventsList.forEach(element => {
        element.innerText = '(25)'
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
      this.$emit('navigation', date)

      /*
        * O componente QDate usa um vue transition de 3ms, como estamos manipulando o DOM, precisamos esperar essa
        * transição terminar para que possamos fazer a logica, com isto precisamos sempre ficar atentos a atualizações
        * do componente QDate para assegurar que esta logica não quebre.
      */
      if (this.useInactiveDates) setTimeout(() => { this.setInactiveEvents(date) }, 350)

      this.$nextTick(() => this.setNewNavigatorDisplay())
    },

    toNumberValues (objet) {
      const normalizedObjet = {}

      for (const key in objet) {
        normalizedObjet[key] = Number(objet[key])
      }

      return normalizedObjet
    }
  }
}
</script>

<style lang="scss">
.qas-date {
  // $
  min-width: 100%;
  width: 100%;

  &__event-inactive {
    background-color: $grey-4;
    bottom: 4px !important;
  }

  &--inative {
    .q-date {
      &__calendar-item--fill {
        @include set-typography($subtitle2);

        color: $grey-4;
        visibility: unset;
      }
    }
  }

  .q-date__navigation > div:last-child,
  .q-date__navigation > div:first-child {
    min-width: auto;
    width: auto;
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

    &__calendar-item--out {
      color: $grey-4;
      opacity: 1;
    }

    &__event {
      @include set-typography($caption);

      background-color: transparent !important;
      // bottom: -15px;
      bottom: initial;
      color: $primary;
      height: 20px;
      left: initial;
      position: relative;
      width: 30px;
    }

    &__months,
    &__years {
      .q-btn {
        background-color: white !important;

        &.bg-primary {
          color: $primary !important;
        }

        @include set-button(tertiary, false, false, grey-9);
      }
    }

    &__view {
      min-height: 230px;
    }

    &__calendar-days-container {
      color: $grey-9;
      min-height: auto;

      .q-btn {
        border: 0;
        box-shadow: none;
        height: 30px !important;
        min-height: 30px;
        min-width: 30px;
        transition: color var(--qas-generic-transition);
        width: 30px !important;

        .q-ripple,
        .q-focus-helper {
          display: none !important;
        }

        &:hover {
          color: var(--q-primary-contrast);
        }

        @include set-typography($subtitle2);
      }
    }

    &__today {
      color: $primary;
    }
  }
}
</style>
