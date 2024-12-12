<template>
  <div class="qas-stepper" :class="classes">
    <q-stepper ref="stepper" v-model="model" v-bind="stepperProps">
      <template v-for="(_, name) in $slots" #[name]="context">
        <slot :name="name" v-bind="getContext(context)" />
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue'
import { Spacing } from '../../enums/Spacing'
import { gutterValidator } from '../../helpers/private/gutter-validator'
import useScreen from '../../composables/use-screen'

defineOptions({ name: 'QasStepper' })

const props = defineProps({
  disable: {
    type: Boolean
  },

  modelValue: {
    type: [String, Number],
    default: 0
  },

  spacing: {
    default: Spacing.Lg,
    type: [String, Boolean],
    validator: gutterValidator
  }
})

const stepper = ref(null)

const attrs = useAttrs()

const screen = useScreen()

const emit = defineEmits(['update:modelValue'])

defineExpose({ next, previous, goTo })

const model = computed({
  get () {
    return props.modelValue
  },

  set (modelValue) {
    return emit('update:modelValue', modelValue)
  }
})

const classes = computed(() => ({ 'qas-stepper--disable': props.disable }))

const stepperProps = computed(() => {
  const defaultProps = {
    contracted: screen.untilLarge,
    doneColor: 'primary',
    flat: true,
    animated: true,
    activeColor: 'primary',
    errorIcon: 'sym_r_close',
    errorColor: 'white',
    headerClass: `text-subtitle1 q-pb-${props.spacing}`,
    inactiveColor: attrs.headerNav ? 'grey-10' : 'grey-6'
  }

  return {
    activeIcon: 'none',
    doneIcon: 'none',
    keepAlive: true,
    ...attrs,
    ...defaultProps
  }
})

function getContext (context) {
  return {
    ...context,
    next,
    previous
  }
}

function goTo (step) {
  stepper.value.goTo(step)
}

function next () {
  if (props.disable) return

  stepper.value.next()
}

function previous () {
  if (props.disable) return

  stepper.value.previous()
}
</script>

<style lang="scss">
.qas-stepper {
  .q-stepper {
    background-color: transparent;

    &__tab {
      padding: 0;

      &--active {
        .q-icon {
          font-size: 14px !important;
          color: white!important;
        }

        .q-stepper__dot {
          background-color: var(--q-primary) !important;
        }
      }

      &:not(.q-stepper__tab--active).q-stepper__tab--error-with-icon  {
        .q-stepper__title {
          color: $grey-10;
        }

        .q-stepper__dot {
          background-color: $negative !important;
        }

        .q-icon {
          font-size: 14px !important;
        }
      }
    }

    &__caption {
      @include set-typography($caption);
      color: $grey-6;
    }
  }

  &--disable {
    .q-stepper {
      &__title {
        color: $grey-6;
      }

      &__line::after,
      &__line::before,
      &__dot {
        background-color: $grey-6 !important;
      }
    }
  }

  .q-stepper--horizontal .q-stepper__line::before,
  .q-stepper--horizontal .q-stepper__line::after {
    height: 4px;
    border-radius: var(--qas-generic-border-radius);
  }

  .q-stepper__header--standard-labels .q-stepper__tab {
    min-height: auto;
  }

  .q-stepper__tab:nth-child(1),
  .q-stepper__tab--done {

    .q-stepper__line::after,
    .q-stepper__line::before {
      background-color: var(--q-primary);
    }
  }

  .q-stepper__tab:nth-child(2),
  .q-stepper__tab--active {
    .q-stepper__line::before {
      background-color: var(--q-primary);
    }
  }

  .q-stepper__nav,
  .q-stepper__step-inner {
    padding: 0;
  }

  .q-stepper__header--contracted .q-stepper__tab:first-child .q-stepper__dot,
  .q-stepper__header--contracted .q-stepper__tab:last-child .q-stepper__dot {
    transform: translateX(0);
  }

  .q-focus-helper {
    display: none;
  }
}
</style>
