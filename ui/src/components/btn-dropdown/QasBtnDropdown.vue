<template>
  <div class="qas-btn-dropdown" :class="classes.parent">
    <div v-if="hasLeftButton" :class="classes.leftSide">
      <slot name="left-button">
        <qas-btn variant="tertiary" v-bind="defaultButtonProps" @click="onClick">
          <q-menu v-if="hasMenuOnLeftSide" v-model="isMenuOpened" anchor="bottom right" auto-close self="top right" @update:model-value="onUpdateMenuValue">
            <div :class="classes.menuContent">
              <slot />
            </div>
          </q-menu>
        </qas-btn>
      </slot>
    </div>

    <q-separator v-if="hasSeparator" class="q-mr-sm qas-btn-dropdown__separator self-center" dark vertical />

    <div v-if="props.useSplit">
      <qas-btn color="grey-10" :icon="props.dropdownIcon" variant="tertiary">
        <q-menu v-if="hasDefaultSlot" anchor="bottom right" auto-close self="top right">
          <div :class="classes.menuContent">
            <slot />
          </div>
        </q-menu>
      </qas-btn>
    </div>
  </div>
</template>

<script setup>
import useScreen from '../../composables/use-screen'

import { ref, watch, computed, useSlots } from 'vue'

defineOptions({
  name: 'QasBtnDropdown',
  inheritAttrs: false
})

const props = defineProps({
  buttonProps: {
    default: () => ({}),
    type: Object
  },

  dropdownIcon: {
    default: 'sym_r_more_vert',
    type: String
  },

  useSplit: {
    type: Boolean
  },

  useMenuPadding: {
    type: Boolean
  },

  menu: {
    type: Boolean
  }
})

const emit = defineEmits(['click', 'update:menu'])

const slots = useSlots()
const screen = useScreen()

const isMenuOpened = ref(false)

const defaultButtonProps = computed(() => {
  const {
    icon,
    iconRight,
    color,
    ...defaultProps
  } = props.buttonProps

  const defaultIconRight = iconRight || props.dropdownIcon

  return {
    useLabelOnSmallScreen: false,

    ...defaultProps,

    color: color || (!props.useSplit ? 'grey-10' : 'primary'),
    ...(!props.useSplit && { iconRight: defaultIconRight }),
    ...(props.useSplit && { icon })
  }
})

const classes = computed(() => {
  return {
    parent: {
      'flex inline items-center': props.useSplit
    },

    leftSide: {
      'q-mr-sm': props.useSplit
    },

    menuContent: {
      'q-pa-md': props.useMenuPadding
    }
  }
})

const hasDefaultSlot = computed(() => !!slots.default)
const hasLeftButton = computed(() => !screen.isSmall || !props.useSplit)
const hasMenuOnLeftSide = computed(() => hasDefaultSlot.value && !props.useSplit)
const hasSeparator = computed(() => !screen.isSmall && props.useSplit)

watch(() => props.menu, value => {
  isMenuOpened.value = value
}, { immediate: true })

function onUpdateMenuValue (value) {
  emit('update:menu', value)
}

function onClick (event) {
  emit('click', event)
}
</script>

<style lang="scss">
.qas-btn-dropdown {
  &__separator {
    height: 18px;
  }
}
</style>
