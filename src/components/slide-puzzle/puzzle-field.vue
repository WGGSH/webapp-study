<template>
  <div class="container">
    <div class="field">
      <div v-for="line in field" :key=line[0] class="line" :style="styleLineHeight">
        <div v-for="cell in line" :key=cell class="cell">
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'puzzle-field',
  props: {
    selectedSize: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      field: [] as Array<Array<number>>,
      size: 0 as number,
    }
  },
  methods: {
    initialize() {
      this.size = this.selectedSize
      this.field = new Array(this.size)
      for (let y = 0; y < this.size; y++) {
        this.field[y] = new Array<number>(this.size)
        for (let x = 0; x < this.size; x++) {
          this.field[y][x] = y * this.size + x + 1
        }
      }
    },
  },
  computed: {
    styleLineHeight() {
      return `height: ${100.0 / this.size}%`
    },
  },
})
</script>

<style lang="scss">

.container {
  width: 90%;
  margin: 16px auto 0;
  position: relative;
  padding-top: 90%;

  .field {
    background: gray;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;

    .line {
      width: 100%;
      height: 25%;
      display: flex;

      .cell {
        width: 100%;
        height: 100%;
        text-align: center;
        border: solid 1px red;
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>
    }
  }
  created() {
