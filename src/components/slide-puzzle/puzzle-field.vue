<template>
  <div class="container">
    <div class="field">
      <div v-for="(line, y) in field" :key=line[0] class="line" :style="styleLineHeight">
        <div v-for="(cell, x) in line" :key=cell class="cell">
          <PuzzleCell :y=y :x=x :value=field[y][x] :isNull="isNullCell(y,x)" @click="onClickCell(y, x)"></PuzzleCell>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PuzzleCell from './puzzle-cell.vue'

export default defineComponent({
  name: 'puzzle-field',
  components: {
    PuzzleCell,
  },
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
    initialize(): void {
      this.size = this.selectedSize
      this.field = new Array(this.size)
      for (let y = 0; y < this.size; y++) {
        this.field[y] = new Array<number>(this.size)
        for (let x = 0; x < this.size; x++) {
          this.field[y][x] = y * this.size + x + 1
          if (y === this.size - 1 && x === this.size - 1) {
            this.field[y][x] = 0
          }
        }
      }
    },
    isNullCell(y:number, x:number): boolean {
      return this.field[y][x] === 0
    },
    searchNullCell(y: number, x:number): boolean | Array<number> {
      if (x !== 0 && this.field[y][x - 1] === 0) return [0, -1]
      if (y !== 0 && this.field[y - 1][x] === 0) return [-1, 0]
      if (x !== this.size - 1 && this.field[y][x + 1] === 0) return [0, 1]
      if (y !== this.size - 1 && this.field[y + 1][x] === 0) return [1, 0]
      return false
    },
    swapCell(from: Array<number>, vec: Array<number>): void {
      const tmp: number = this.field[from[0]][from[1]]
      this.field[from[0]][from[1]] = this.field[from[0] + vec[0]][from[1] + vec[1]]
      this.field[from[0] + vec[0]][from[1] + vec[1]] = tmp
    },
    onClickCell(y: number, x: number): void {
      if (this.isNullCell(y, x)) return
      const vec: boolean | Array<number> = this.searchNullCell(y, x)
      if (vec !== false) {
        this.swapCell([y, x], vec as Array<number>)
      }
    },
  },
  computed: {
    styleLineHeight(): string {
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
  pointer-events: none;

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
    }
  }
}
</style>
