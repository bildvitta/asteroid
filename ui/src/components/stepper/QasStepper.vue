<template>
  <div class="qas-stepper" :class="classes">
    <q-stepper ref="stepper" v-model="model" active-color="primary" active-icon="none" animated :contracted="screen.untilLarge" done-color="primary" done-icon="none" flat :header-class="headerClass" inactive-color="grey-6" keep-alive>
      <template v-for="(_, name) in $slots" #[name]="context">
        <slot :name="name" v-bind="getContext(context)" />
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Spacing } from '../../enums/Spacing'
import { gutterValidator } from '../../composables/private/use-generator'
import useScreen from '../../composables/use-screen'

defineOptions({ name: 'QasStepper' })

const props = defineProps({
  disable: {
    type: Boolean
  },

  modelValue: {
    type: [Number, String],
    default: 0
  },

  spacing: {
    default: Spacing.Lg,
    type: [String, Boolean],
    validator: gutterValidator
  }
})

const stepper = ref(null)

const screen = useScreen()

const emit = defineEmits(['update:modelValue'])

defineExpose({ next, previous })

const model = computed({
  get () {
    return props.modelValue
  },

  set (modelValue) {
    return emit('update:modelValue', modelValue)
  }
})

const classes = computed(() => ({ 'qas-stepper--disable': props.disable }))

const headerClass = computed(() => `text-subtitle1 q-pb-${props.spacing}`)

function getContext (context) {
  return {
    ...context,
    next,
    previous
  }
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
