<template>
  <q-timeline
    class="qas-timeline"
    color="grey-6"
    layout="comfortable"
  >
    <template
      v-for="(item, index) in list"
      :key="`timeline-${index}-${item.id}`"
    >
      <q-timeline-entry
        side="left"
        :subtitle="getFormattedValue(item, Masks.Date)"
      >
        <slot :item="item">
          <div class="column justify-center q-gutter-sm q-py-md qas-timeline__content">
            <slot :item="item" name="hour">
              <div class="text-body2 text-grey-8">
                Adicionado às {{ getFormattedValue(item, Masks.Hour) }}
              </div>
            </slot>

            <slot :item="item" name="description">
              <div class="text-body1 text-grey-9">
                {{ item[descriptionKey] }}
              </div>
            </slot>
          </div>
        </slot>
      </q-timeline-entry>
    </template>
  </q-timeline>
</template>

<script setup>
import { date as dateFn } from '../../helpers/filters'

defineOptions({ name: 'QasTimeline' })

const Masks = {
  Hour: 'HH:mm',
  Date: 'dd MMM yyyy'
}

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },

  dateKey: {
    type: String,
    default: 'date'
  },

  hourKey: {
    type: String,
    default: 'date'
  },

  descriptionKey: {
    type: String,
    default: 'description'
  }
})

function isInvalidDate (date) {
  const day = new Date(date).getDay()

  return isNaN(day)
}

function getFormattedValue (item, type) {
  const itemKey = type === Masks.Hour ? props.hourKey : props.dateKey

  const date = item[itemKey]

  return isInvalidDate(date) ? date : dateFn(date, 'dd MMM yyyy')
}
</script>

<style lang="scss">
.qas-timeline {
  margin: 0;

  &__content {
    min-height: 100px;
  }

  .q-timeline__subtitle {
    color: $dark;
    opacity: initial;
    padding-right: 0;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 80px;

    &::before {
      background-color: currentColor;
      bottom: 0;
      content: "";
      display: block;
      opacity: 0.4;
      position: absolute;
      right: -30px;
      top: 0px;
      transition: opacity var(--qas-generic-transition) ease;
      width: 3px;
    }
  }

  .q-timeline__entry {
    &:hover,
    .active {
      .q-timeline__subtitle {
        &::before {
          background-color: $primary;
          opacity: 1;
        }
      }
    }
  }

  .q-timeline__content {
    padding-bottom: 0;
    vertical-align: middle;
  }

  .q-timeline__title {
    margin-bottom: 0;
  }

  .q-timeline__dot::before,
  .q-timeline__dot::after {
    display: none;
  }
}
</style>
