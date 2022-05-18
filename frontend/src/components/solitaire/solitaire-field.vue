<template>
  <div class="solitaire-container">
    ソリティア
    <div class="border">
      <div class="top-area">
        <div class="pairs">
        <div v-for="(row, index_row) in pairs" :key="`pairs-${index_row}`" class="row">
          <div v-for="(card) in row" :key="`13 * ${card.mark} + ${card.number}`" class="card">
            <VSolitaireCardNull v-if="card.isNull"></VSolitaireCardNull>
            <VSolitaireCard v-else
              :number="card.number"
              :mark="card.mark"
              :isFront="card.isFront"
              class="card"
            >
            </VSolitaireCard>
          </div>
        </div>
        </div>
        <div class="deck">
          <VSolitaireCard
            :number="deckTop.number"
            :mark="deckTop.mark"
            :isFront="true"
            class="card"
          >
          </VSolitaireCard>
        </div>
      </div>
      <div class="field">
        <div v-for="(row, index_row) in field" :key="`field-${index_row}`" class="row">
          <VSolitaireCard
            v-for="(card, index_column) in row"
            :key="`13 * ${card.mark} + ${card.number}`"
            :number="card.number"
            :mark="card.mark"
            :isFront="card.isFront"
            :style="styleTop(index_column * 18)"
            @click="onClickCard(index_row, index_column)"
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
import VSolitaireCardNull from './solitaire-card-null.vue'

import SolitaireCard from '../../script/solitaire/solitaire-card'

export default defineComponent({
  name: 'solitaire-field',
  components: {
    VSolitaireCard,
    VSolitaireCardNull,
  },
  data() {
    return {
      allCards: [] as Array<SolitaireCard>,
      field: [] as Array<Array<SolitaireCard>>,
      pairs: [] as Array<Array<SolitaireCard>>,
      decks: [] as Array<SolitaireCard>,
    }
  },
  computed: {
    deckTop(): SolitaireCard {
      if (Array.isArray(this.decks)) {
        return this.decks[0]
      }
      return new SolitaireCard(0, 0, true, true)
    },
  },
  methods: {
    styleTop(num: number) {
      return { '--top': `${num}px` }
    },
    onClickCard(a: number, b: number): void {
      console.log(a, b)
    },
    shuffle() {
      const cloneCards: Array<SolitaireCard> = [...this.allCards]
      const size = this.allCards.length
      console.log(size)
      for (let i = 0; i < 10000; i++) {
        const index1: number = Math.floor(Math.random() * size)
        const index2: number = Math.floor(Math.random() * size)
        const tmp: SolitaireCard = cloneCards[index1]
        cloneCards[index1] = cloneCards[index2]
        cloneCards[index2] = tmp
      }
      this.allCards = cloneCards
      // const result: Array<SolitaireCard> = cloneCards.reduce((prev: SolitaireCard, current: SolitaireCard, idx: number) => {
      //   const rand: number = Math.floor(Math.random() * (idx + 1))
      //   cloneCards[idx] = cloneCards[rand]
      //   cloneCards[rand] = current
      //   console.log(prev)
      //   return cloneCards
      // })
      // this.allCards = result
    },
  },
  created() {
    for (let n = 1; n <= 13; n++) {
      for (let m = 0; m < 4; m++) {
        this.allCards.push(new SolitaireCard(n, m, true))
      }
    }
    this.shuffle()

    this.pairs = new Array(4)
    for (let i = 0; i < 4; i++) {
      this.pairs[i] = new Array(0)
      this.pairs[i].push(new SolitaireCard(0, 0, false, true))
      // if (i === 0) continue
      // this.pairs[i].push(new SolitaireCard(1, i, true))
    }

    this.field = new Array(7)
    let count = 0
    for (let i = 0; i < 7; i++) {
      this.field[i] = new Array(0)
      for (let j = 0; j <= i; j++) {
        this.field[i].push(this.allCards[count++])
        this.field[i][j].isFront = (i === j)
      }
    }

    this.decks = new Array(0)
    for (let i = count; i < this.allCards.length; i++) {
      this.decks.push(this.allCards[i])
    }

    console.log(this.decks)
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
      display: flex;
      width: 100%;

      > .pairs {
        display: flex;
        justify-content:  space-between;
        width: 150px;
        /* width: 60%; */

        > .row {
          > .card {
            position: absolute;
          }
        }
      }

      .deck {
        margin-left: auto;
        margin-right: 16px;
      }
    }

    > .field {
      padding: 0 8px;
      display: flex;
      justify-content: space-between;

      > .row {
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
