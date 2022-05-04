<template>
  <div class="slide-puzzle-container">
    <div class="field">
      <div v-for="(line, y) in field" :key=line[0] class="line" :style="styleLineHeight">
        <div v-for="(cell, x) in line" :key=cell class="cell">
          <PuzzleCell :y=y :x=x :value=field[y][x] :isNull="isNullCell(vec(y, x))" @click="onClickCell(vec(y, x))"></PuzzleCell>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PuzzleCell from './puzzle-cell.vue'
import Vec2 from '../../script/utils/vec2'

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
      isPlaying: false as boolean,
    }
  },
  methods: {
    vec(y: number, x: number): Vec2 {
      return new Vec2(x, y)
    },
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
      this.isPlaying = false
    },
    isNullCell(p: Vec2): boolean {
      return this.field[p.y][p.x] === 0
    },
    searchNullCellFromTargetCell(p: Vec2): Vec2 {
      if (p.x !== 0 && this.field[p.y][p.x - 1] === 0) return new Vec2(-1, 0)
      if (p.y !== 0 && this.field[p.y - 1][p.x] === 0) return new Vec2(0, -1)
      if (p.x !== this.size - 1 && this.field[p.y][p.x + 1] === 0) return new Vec2(1, 0)
      if (p.y !== this.size - 1 && this.field[p.y + 1][p.x] === 0) return new Vec2(0, 1)
      return new Vec2(0, 0)
    },
    swapCell(from: Vec2, vec: Vec2): void {
      const tmp: number = this.field[from.y][from.x]
      this.field[from.y][from.x] = this.field[from.y + vec.y][from.x + vec.x]
      this.field[from.y + vec.y][from.x + vec.x] = tmp
    },
    onClickCell(p: Vec2): void {
      this.moveCell(p)
    },
    moveCell(p: Vec2): void {
      if (this.isNullCell(p)) return
      const vec: Vec2 = this.searchNullCellFromTargetCell(p)
      if (!vec.isZero()) {
        this.swapCell(p, vec)
      }
    },
    getRandomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max + 1 - min)) + min
    },
    shuffle(count: number): void {
      this.isPlaying = false
      for (let i = 0; i < count; i++) {
        const cell = new Vec2(this.getRandomInt(0, this.size - 1), this.getRandomInt(0, this.size - 1))
        this.moveCell(cell)
      }
      this.isPlaying = true
    },
  },
  computed: {
    styleLineHeight(): string {
      return `height: ${100.0 / this.size}%`
    },
    isPuzzleClear(): boolean {
      if (this.isPlaying === false) return false

      let result = true
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          if (y === this.size - 1 && x === this.size - 1) {
            if (this.field[y][x] !== 0) result = false
            continue
          }
          if (this.field[y][x] !== y * this.size + x + 1) result = false
        }
      }
      return result
    },
  },
})
</script>

<style lang="scss">

.slide-puzzle-container {
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
