<template>
  <div class="life-game-container">
    <div class="field">
      <div v-for="(line, y) in field" :key="`line-${y}`" class="line">
        <v-card v-for="(cell, x) in line" :key="`cell-${y}-${x}`" class="cell" :color="cellColor(y, x)" @click="onClickCell(y, x)">
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'life-game-field',
  data() {
    return {
      field: [] as Array<Array<boolean>>,
      size_y: 20 as number,
      size_x: 10 as number,
      size: 30 as number,
      isAutoPlaying: false as boolean,
      autoId: 0 as number,
    }
  },
  methods: {
    onClickCell(y: number, x: number): void {
      this.field[y][x] = !this.field[y][x]
      console.log(y, x)
    },
    cellColor(y: number, x: number): string {
      if (this.field[y][x]) return 'primary'
      return 'grey-darken-3'
    },
    next(): void {
      const tmpField : Array<Array<boolean>> = new Array(this.size_y)
      for (let y = 0; y < this.size_y; y++) {
        tmpField[y] = new Array<boolean>(this.size_x)
        for (let x = 0; x < this.size_x; x++) {
          let fillCount = 0
          for (let y2 = -1; y2 <= 1; y2++) {
            for (let x2 = -1; x2 <= 1; x2++) {
              if (y2 === 0 && x2 === 0) continue

              let py: number = y + y2
              if (py < 0) py += this.size_y
              if (py >= this.size_y) py -= this.size_y
              let px: number = x + x2
              if (px < 0) px += this.size_x
              if (px >= this.size_x) px -= this.size_x

              if (this.field[py][px]) fillCount++
            }
          }

          if (this.field[y][x]) {
            switch (fillCount) {
              case 2:
              case 3:
                tmpField[y][x] = true
                break
              default:
                tmpField[y][x] = false
                break
            }
          } else {
            switch (fillCount) {
              case 3:
                tmpField[y][x] = true
                break
              default:
                tmpField[y][x] = false
                break
            }
          }
        }
      }

      for (let y = 0; y < this.size_y; y++) {
        for (let x = 0; x < this.size_x; x++) {
          this.field[y][x] = tmpField[y][x]
        }
      }
    },
    autoStart(): void {
      if (this.isAutoPlaying) return
      this.isAutoPlaying = true
      this.autoId = setInterval(() => {
        this.next()
      }, 200)
    },
    autoStop(): void {
      if (!this.isAutoPlaying) return
      this.isAutoPlaying = false
      clearInterval(this.autoId)
    },
  },
  created() {
    this.field = new Array(this.size_y)
    for (let y = 0; y < this.size_y; y++) {
      this.field[y] = new Array<boolean>(this.size_x)
      for (let x = 0; x < this.size_x; x++) {
        this.field[y][x] = false
      }
    }
  },
})

</script>

<style lang="scss">

.life-game-container {
  width: 300px;
  height: 600px;
  margin: 16px auto;

  .field {
    top:0;
    right: 0;
    bottom: 0;
    left: 0;

    .line {
      width: 100%;
      height: 30px;
      display: flex;

      .cell {
        width: 100%;
        height: 100%;
        text-align: center;
        box-shadow: 0 0 1px 1px white;
        place-items: center;
        pointer-events: auto;
      }
    }
  }
}
</style>
