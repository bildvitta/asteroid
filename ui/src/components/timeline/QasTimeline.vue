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
        :subtitle="getSubtitle(item)"
      >
        <slot :item="item">
          <div class="column justify-center q-gutter-sm q-py-md">
            <slot :item="item" name="hour">
              <div class="text-body2 text-grey-8">
                Adicionado às {{ getFormattedTime(item) }}
              </div>
            </slot>

            <slot :item="item" name="description">
              <div class="row text-body1 text-grey-9">
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
import { defineProps } from 'vue'

defineOptions({ name: 'QasTimeline' })

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

function getSubtitle (item) {
  console.log(new Date(item[props.dateKey]) === 'Invalid Date', '<---- date valid')
  // return dateFn(item[props.dateKey], 'dd MMM yyyy')
  return item[props.dateKey]
}

function getFormattedTime (item) {
  // return dateFn(item[props.hourKey], 'HH:mm')
  return item[props.dateKey]
}
</script>

<style lang="scss">
.qas-timeline {
  margin: 0;

  .q-timeline__subtitle {
    width: 80px;
    color: $dark;
    opacity: initial;
    padding-right: 0;
    position: relative;
    text-align: center;
    vertical-align: middle;

    &::before {
      width: 3px;
      opacity: 0.4;
      top: 0px;
      bottom: 0;
      right: -30px;

      content: "";
      background: currentColor;
      transition: all 300ms ease;
      display: block;
      position: absolute;
    }
  }

  .q-timeline__entry {
    &:hover, .active {
      .q-timeline__subtitle {
        &::before {
          background: $primary;
          opacity: 1;
        }
      }
    }
  }

  .q-timeline__content {
    vertical-align: middle;
    padding-bottom: 0;
  }

  .q-timeline__title {
    margin-bottom: 0;
  }

  .q-timeline__dot:before, .q-timeline__dot:after {
    display: none;
  }
}
</style>
