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

    eventColor: {
      type: [String, Function],
      default: ''
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
        mask: this.mask,
        minimal: true,
        multiple: this.multiple,
        options: this.normalizedOptions,
        ref: 'date',
        style: this.styles,
        textColor: 'white',

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

    isEventsCallback () {
      return typeof this.events === 'function'
    },

    isEventColorCallback () {
      return typeof this.eventColor === 'function'
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

    normalizedOptions () {
      console.log(this.getUnmaskedList(this.options))
      return this.useUnmaskOptions ? this.getUnmaskedList(this.options) : this.options
    }
  },

  watch: {
    events () {
      this.setEvents(this.currentDate)
    }
  },

  mounted () {
    this.setNewNavigatorDisplay()

    this.currentDate = this.getCurrentDate()

    this.setEvents(this.currentDate)
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
        : list.map(item => asteroidDate(item, 'yyyy/MM/dd'))
    },

    getStatusDay ({ currentDay, index }) {
      const status = {
        isPrevious: false,
        isNext: false,
        isActiveMonthDay: false
      }

      if (currentDay > index) {
        status.isPrevious = true

        return status
      }

      if (index - 7 > currentDay) {
        status.isNext = true

        return status
      }

      status.isActiveMonthDay = true

      return status
    },

    getNormalizedYear ({ isNext, isPrevious, month, year }) {
      if (isPrevious && month === 1) return year - 1

      if (isNext && month === 12) return year + 1

      return year
    },

    getNormalizedMonth ({ month, isPrevious, isNext }) {
      if (isPrevious) return month === 1 ? (month = 12) : month - 1

      if (isNext) return month === 12 ? (month = 1) : month + 1

      return month
    },

    getCurrentEvent (date) {
      return this.events.find(event => event.date === date)
    },

    getCurrentColor (date, color) {
      return (
        (this.isEventColorCallback ? this.eventColor(date) : this.eventColor) || color
      )
    },

    createPointerEventElement (isDisabled, currentColor, eventElement) {
      const eventPointerElement = document.createElement('div')

      eventPointerElement.classList.add(
        'qas-date__event-pointer',
        `bg-${isDisabled ? 'grey-4' : currentColor || 'primary'}`
      )

      eventElement.appendChild(eventPointerElement)
    },

    createCounterInactiveEventElement (dayElement, eventElement) {
      const spanElement = document.createElement('span')
      const child = dayElement.children[0]

      spanElement.classList.add('flex', 'items-center', 'justify-center', 'text-center')

      spanElement.appendChild(child)
      spanElement.appendChild(eventElement)
      dayElement.appendChild(spanElement)
    },

    createActiveEventElement (dayElement, eventElement) {
      const buttonElement = dayElement.querySelector('.q-btn__content')

      buttonElement.appendChild(eventElement)
    },

    setTextCountEvent (eventElement, currentEvent) {
      eventElement.innerText = `(${currentEvent.counter})`
    },

    getEventClasses (currentColor, hasCounter, isDisabled) {
      return [
        'qas-date__event',

        isDisabled ? 'qas-date__event--inactive' : 'qas-date__event--active',

        `text-${currentColor || (isDisabled ? 'grey-4' : 'primary')}`,

        hasCounter ? 'qas-date__event--counter' : 'qas-date__event--pointer'
      ]
    },

    setEventClasses (currentColor, eventElement, hasCounter, isDisabled) {
      const classes = this.getEventClasses(currentColor, hasCounter, isDisabled)

      eventElement.classList.add(...classes)
    },

    setEvents ({ year, month }) {
      if (!this.events.length || !year || !month) return

      const dateElement = this.$refs.date.$el
      const activeDaysElements = dateElement.querySelectorAll('.q-date__calendar-days .q-date__calendar-item')
      const activeList = Array.from(activeDaysElements)

      activeList.forEach((dayElement, index) => {
        const [child] = dayElement.children
        const day = child.textContent

        const { isActiveMonthDay, isNext, isPrevious } = this.getStatusDay({ currentDay: day, index: index++ })

        const normalizedYear = this.getNormalizedYear({ isNext, month, isPrevious, year })
        const normalizedMonth = this.getNormalizedMonth({ isNext, isPrevious, month })
        const newDate = date.buildDate({ year: normalizedYear, month: normalizedMonth, day })
        const normalizedDate = asteroidDate(newDate, 'yyyy-MM-dd')

        const currentEvent = this.isEventsCallback ? this.events(normalizedDate) : this.getCurrentEvent(normalizedDate)

        const hasDisabledClass = dayElement.classList.contains('q-date__calendar-item--out')
        const isDisabled = !isActiveMonthDay || hasDisabledClass

        /*
          * Se não tiver evento para o dia atual no loop
          * a opção de eventos inativos estiver desabilitada e o dia atual do loop
          * for refente ao mês anterior ou ao mês posterior, então retorna
        */
        if (!currentEvent || (!this.useInactiveDates && !isActiveMonthDay)) return

        const hasCounter = currentEvent.counter

        const currentColor = this.getCurrentColor(normalizedDate, currentEvent?.color)

        const eventElement = document.createElement('div')

        dayElement.classList.add('qas-date__calendar-item-event')

        this.setEventClasses(currentColor, eventElement, hasCounter, isDisabled)

        if (hasCounter) {
          this.setTextCountEvent(eventElement, currentEvent)
        } else {
          this.createPointerEventElement(isDisabled, currentColor, eventElement)
        }

        if (isDisabled) {
          this.createCounterInactiveEventElement(dayElement, eventElement)

          return
        }

        this.createActiveEventElement(dayElement, eventElement)
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

      this.currentDate = date

      /*
        * O componente QDate usa um vue transition de 3ms, como estamos manipulando o DOM, precisamos esperar essa
        * transição terminar para que possamos fazer a logica, com isto precisamos sempre ficar atentos a atualizações
        * do componente QDate para assegurar que esta logica não quebre.
      */
      setTimeout(() => { this.setEvents(date) }, 350)

      this.$nextTick(() => this.setNewNavigatorDisplay())
    }
  }
}
</script>

<style lang="scss">
.qas-date {
  // $
  min-width: 100%;
  width: 100%;

  &__event {
    @include set-typography($caption);

    bottom: -6px;
    color: $primary;
    font-size: 10px !important;
    height: 20px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 100%;

    &--pointer {
      bottom: -6px;
      display: flex;
      justify-content: center;
    }
  }

  &__event-pointer {
    border-radius: 100%;
    display: flex;
    height: 6px;
    justify-content: center;
    margin-top: var(--qas-spacing-xs);
    width: 6px;
  }

  &--inative {
    .q-date {
      &__calendar-item--out,
      &__calendar-item--fill {
        @include set-typography($subtitle2);

        color: $grey-4;
        visibility: unset;

        span {
          height: 36px;
          padding: var(--qas-spacing-xs);
        }
      }
    }

    .qas-date__event--inactive.qas-date__event--counter {
      color: $grey-4 !important;
    }
  }

  &__calendar-item-event {
    .q-btn {
      &.bg-primary span {
        padding-bottom: 4px;
      }

      &.bg-primary .qas-date__event {
        bottom: -2px;
      }

      &.bg-primary .qas-date__event--pointer {
        bottom: -2px;
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
        border-radius: $generic-border-radius;
        box-shadow: none;
        height: 36px !important;
        min-height: 30px;
        min-width: 30px;
        transition: color var(--qas-generic-transition);
        width: 30px !important;

        .q-ripple,
        .q-focus-helper {
          display: none !important;
        }

        &.bg-primary .qas-date__event--active {
          color: white !important;
        }

        &.bg-primary .qas-date__event--active .qas-date__event-pointer {
          background-color: white !important;
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
