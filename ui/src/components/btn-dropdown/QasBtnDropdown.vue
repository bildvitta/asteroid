<template>
  <div class="qas-btn-dropdown" :class="classes.parent">
    <div v-if="hasButtons" class="flex">
      <div v-for="(buttonProps, index) in defaultButtonPropsList" :key="index">
        <div class="flex">
          <qas-btn variant="tertiary" v-bind="buttonProps" @click="onClick">
            <q-menu v-if="hasMenuOnLeftSide" v-model="isMenuOpened" anchor="bottom right" auto-close self="top right" @update:model-value="onUpdateMenuValue">
              <div :class="classes.menuContent">
                <slot />
              </div>
            </q-menu>
          </qas-btn>

          <q-separator v-if="hasSeparator(index)" class="q-mx-sm qas-btn-dropdown__separator self-center" dark vertical />
        </div>
      </div>
    </div>

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
  buttonsPropsList: {
    default: () => [],
    type: Array
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

const classes = computed(() => {
  return {
    parent: {
      'flex inline items-center': props.useSplit
    },

    menuContent: {
      'q-pa-md': props.useMenuPadding
    }
  }
})

const buttonsPropsListSize = computed(() => props.buttonsPropsList.length)
const isSingleButton = computed(() => buttonsPropsListSize.value === 1)

const defaultButtonPropsList = computed(() => {
  return props.buttonsPropsList.map((buttonProps, index) => {
    const { iconRight, color } = buttonProps

    const isLastButton = isLast(index)
    const isSingle = !index && isSingleButton.value

    return {
      color: color || (isSingle && props.useSplit) ? 'primary' : 'grey-10',
      iconRight: iconRight || (isLastButton && !props.useSplit) ? props.dropdownIcon : undefined,
      useLabelOnSmallScreen: false,

      ...buttonProps
    }
  })
})

const hasButtons = computed(() => !screen.isSmall || !props.useSplit)
const hasDefaultSlot = computed(() => !!slots.default)
const hasMenuOnLeftSide = computed(() => hasDefaultSlot.value && !props.useSplit && isSingleButton.value)

watch(() => props.menu, value => {
  isMenuOpened.value = value
}, { immediate: true })

function onUpdateMenuValue (value) {
  emit('update:menu', value)
}

function onClick (event) {
  emit('click', event)
}

function isLast (index) {
  return index + 1 === buttonsPropsListSize.value
}

function hasSeparator (index) {
  return props.useSplit || !isLast(index)
}
</script>

<style lang="scss">
.qas-btn-dropdown {
  &__separator {
    height: 18px;
  }
}
</style>
