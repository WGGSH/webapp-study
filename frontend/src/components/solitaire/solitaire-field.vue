<template>
  <div class="solitaire-container">
    ソリティア
    <div class="border">
      <div class="top-area">
      </div>
      <div class="field">
        <div v-for="(column, index) in field" :key="`field-${index}`" class="column">
          <VSolitaireCard
            v-for="(card, index) in column"
            :key="`13 * ${card.mark} + ${card.number}`"
            :number="card.number"
            :mark="card.mark"
            :isFront="card.isFront"
            :style="styleTop(index * 18)"
            class="card"
          >
          </VSolitaireCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VSolitaireCard from './solitaire-card.vue'

import SolitaireCard from '../../script/solitaire/solitaire-card'

export default defineComponent({
  name: 'solitaire-field',
  components: {
    VSolitaireCard,
  },
  data() {
    return {
      allCards: [] as Array<SolitaireCard>,
      field: [] as Array<Array<SolitaireCard>>,
    }
  },
  methods: {
    styleTop(num: number) {
      return { '--top': `${num}px` }
    },
  },
  created() {
    for (let n = 1; n <= 13; n++) {
      for (let m = 0; m < 4; m++) {
        this.allCards.push(new SolitaireCard(n, m, false))
      }
    }

    this.field = new Array(7)
    let count = 0
    for (let i = 0; i < 7; i++) {
      this.field[i] = new Array(0)
      for (let j = 0; j <= i; j++) {
        this.field[i].push(this.allCards[count++])
      }
    }
    console.log(this.field)
  },
})
</script>

<style lang="scss">
.solitaire-container {
  background: green;
  height: 90vh;
  padding: 16px;
  display: flex;
  flex-direction: column;

  > .border {
    position: relative;
    height: 100%;
    box-shadow: 0 0 2px 4px white;
    border-radius: 8px;

    > .top-area {
      height: 100px;
    }

    > .field {
      padding: 0 8px;
      display: flex;
      justify-content: space-between;

      > .column {
        width: 100%;
        margin: 0 4px;
        position: relative;

        > .card {
          position: absolute;
          width: 100%;
          top: var(--top);
        }
      }
    }
  }
}
</style>
