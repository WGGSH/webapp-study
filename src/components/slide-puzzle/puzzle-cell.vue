<template>
  <v-card class="slide-puzzle-cell rounded-lg" :class="{ isNull: isNull }">
    <v-card-text v-if="showValue" class="value">
      {{ value }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'puzzleCell',
  props: {
    y: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    isNull: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showValue() {
      return !this.isNull
    },
  },
})
</script>

<style lang="scss">
.slide-puzzle-cell {
  width: 100%;
  height: 100%;
  text-align: center;
  box-shadow: 0 0 5px 0.1px white;
  place-items: center;
  pointer-events: auto;

  &.isNull {
    background: white;
  }

  .value {
    transform: scale(1.8,1.8);
    pointer-events: none;
  }
}
</style>
