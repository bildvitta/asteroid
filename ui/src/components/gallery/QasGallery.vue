<template>
  <div class="qas-gallery">
    <div class="q-col-gutter-md row">
      <div v-for="(image, index) in getInitialImages()" :key="index" :class="galleryColumnsClasses" :data-cy="`gallery-image-${index}`">
        <qas-gallery-card :key="galleryCardCountToReRender" v-bind="getGalleryCardProps({ image, index })">
          <template v-for="(_, name) in slots" #[name]="context">
            <slot v-bind="context" :image="image" :index="index" :name="name" />
          </template>
        </qas-gallery-card>
      </div>

      <slot>
        <div v-if="!hideShowMore" class="full-width text-center">
          <qas-btn color="primary" data-cy="gallery-btn-show-more" :label="props.showMoreLabel" variant="tertiary" @click="showMore" />
        </div>
      </slot>

      <pv-gallery-carousel-dialog v-model="carouselDialog" v-model:imageIndex="imageIndex" :images="normalizedImages" />

      <pv-gallery-delete-dialog v-model="showDeleteDialog" v-bind="deleteGalleryDialogProps" @cancel="resetCurrentModel" @error="onDeleteError" @success="onDeleteSuccess" />
    </div>
  </div>
</template>

<script setup>
import PvGalleryCarouselDialog from './private/PvGalleryCarouselDialog.vue'
import PvGalleryDeleteDialog from './private/PvGalleryDeleteDialog.vue'
import QasBtn from '../btn/QasBtn.vue'

import { baseProps } from './composables/use-delete'
import { useScreen } from '../../composables'

import { extend } from 'quasar'
import { ref, computed, watch, useSlots } from 'vue'

defineOptions({ name: 'QasGallery' })

const props = defineProps({
  ...baseProps,

  galleryCardProps: {
    type: Object,
    default: () => ({})
  },

  initialSize: {
    type: Number,
    default: 4,
    validator: value => [1, 2, 3, 4, 6, 12].includes(value)
  },

  showMoreLabel: {
    type: String,
    default: 'Ver mais'
  },

  useLoadAll: {
    type: Boolean
  },

  useDestroy: {
    type: Boolean
  },

  useObjectModel: {
    type: Boolean
  },

  modelValue: {
    type: Array,
    default: () => []
  },

  modelKey: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'delete-error',
  'delete-success',
  'update:modelValue'
])

const screen = useScreen()
const slots = useSlots()

const carouselDialog = ref(false)
const imageIndex = ref(0)
const displayedImages = ref(props.initialSize)
const showDeleteDialog = ref(false)
const currentModel = ref([])
const imageToBeDestroyed = ref({ index: null })

// contador para key
const galleryCardCountToReRender = ref(1)

// computed
const galleryColumnsClasses = computed(() => {
  const size = 12 / props.initialSize
  const col = `col-${size}`

  return screen.isSmall ? 'col-12' : col
})

const clonedImages = computed(() => extend(true, [], props.modelValue))

const normalizedImages = computed(() => {
  if (props.useObjectModel) return clonedImages.value

  return clonedImages.value.map(url => ({ url }))
})

const hideShowMore = computed(() => {
  return (normalizedImages.value.length <= displayedImages.value) || props.useLoadAll
})

const deleteGalleryDialogProps = computed(() => {
  return {
    customId: props.customId,
    dialogProps: props.dialogProps,
    entity: props.entity,
    modelKey: props.modelKey,
    payload: currentModel.value,
    url: props.url
  }
})

watch(() => normalizedImages.value, value => {
  currentModel.value = extend(true, [], value)
}, { immediate: true })

// functions
function getActionsMenuProps ({ image, index }) {
  if (!props.useDestroy) return {}

  return {
    useLabel: false,

    buttonProps: {
      disable: isDestroyDisabled(image)
    },

    list: {
      destroy: {
        label: 'Excluir',
        color: 'grey-10',
        icon: 'sym_r_delete',

        handler: () => onDelete(image, index)
      }
    }
  }
}

function getGalleryCardProps ({ image, index }) {
  return {
    actionsMenuProps: getActionsMenuProps({ image, index }),
    card: image,
    imageProps: getImageProps({ image, index }),

    ...props.galleryCardProps
  }
}

function getImageProps ({ image, index }) {
  return {
    class: 'cursor-pointer',

    onClick: () => toggleCarouselDialog(index),
    onError: () => onError(image.url)
  }
}

function getInitialImages () {
  return props.useLoadAll
    ? normalizedImages.value
    : normalizedImages.value.slice(0, displayedImages.value)
}

function isDestroyDisabled (image) {
  return 'destroyable' in image && !image.destroyable
}

function resetCurrentModel () {
  currentModel.value = extend(true, [], normalizedImages.value)
}

function onError (error) {
  const index = normalizedImages.value.findIndex(image => image.url === error)

  if (~index) {
    normalizedImages.value.splice(index, 1)

    /**
     * Posteriormente no Options API estava sendo usado "this.$forceUpdate()"
     * porém agora estamos usando uma forma mais apropriada que é atualizar através de key
     * com contadores.
     */
    galleryCardCountToReRender.value += 1
  }
}

function onDeleteError (error) {
  resetCurrentModel()

  emit(
    'delete-error',
    { data: error, index: imageToBeDestroyed.value.index }
  )
}

function onDelete (image, index) {
  if (isDestroyDisabled(image)) return

  imageToBeDestroyed.value.index = index

  currentModel.value.splice(imageToBeDestroyed.value.index, 1)

  showDeleteDialog.value = !showDeleteDialog.value
}

function onDeleteSuccess () {
  normalizedImages.value.splice(imageToBeDestroyed.value.index, 1)

  emit('update:modelValue', normalizedImages.value)

  emit(
    'delete-success',
    { data: normalizedImages.value, index: imageToBeDestroyed.value.index }
  )
}

function toggleCarouselDialog (index) {
  imageIndex.value = index
  carouselDialog.value = !carouselDialog.value
}

function showMore () {
  displayedImages.value += displayedImages.value
}
</script>
