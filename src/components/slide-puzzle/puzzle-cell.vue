<template>
  <div class="cell" :class="{ isNull: isNull }" :click="onClick">
    <span v-if="showValue">
      {{ value }}
    </span>
  </div>
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
  methods: {
    onClick() {
      alert('hoge')
      console.log(this.value)
      console.log(this.isNull)
    },
  },
})
</script>

<style lang="scss">
.cell {
  width: 100%;
  height: 100%;
  text-align: center;
  border: solid 1px cyan;
  margin: -1px;
  display: grid;
  place-items: center;
  pointer-events: auto;

  &.isNull {
    background: white;
  }
}
</style>
