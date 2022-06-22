<template>
  <div class="solitaire-container">
    ソリティア
    <div class="border">
      <div class="top-area">
        <div class="pairs">
        <div v-for="(row, index_row) in pairs" :key="`pairs-${index_row}`" class="row">
          <div v-for="(card) in row" :key="`13 * ${card.mark} + ${card.number}`" class="card">
            <!-- <VSolitaireCardNull v-if="card.isNull" @click="onClickPairCard(index_row)"></VSolitaireCardNull> -->
            <VSolitaireCardNull v-if="card.isNull" @click="onClickCard(card)"></VSolitaireCardNull>
            <!-- <VSolitaireCard v-else -->
            <!--   :number="card.number" -->
            <!--   :mark="card.mark" -->
            <!--   :isFront="card.isFront" -->
            <!--   @click="onClickPairCard(index_row)" -->
            <!--   class="card" -->
            <!-- > -->
            <VSolitaireCard v-else
              :number="card.number"
              :mark="card.mark"
              :isFront="card.isFront"
              @click="onClickCard(card)"
              class="card"
            >
            </VSolitaireCard>
          </div>
        </div>
        </div>
        <div class="hand">
          <VSolitaireCardNull
            v-if="handTop.isNull"
          />
          <VSolitaireCard
            v-else
            :number="handTop.number"
            :mark="handTop.mark"
            :isFront="true"
            :isSelect="handTop.isSelect"
          />
        </div>
        <div class="deck">
          <!-- <VSolitaireCardNull -->
          <!--   v-if="deckTop.isNull" -->
          <!--   @click="onClickDeckEmpty" -->
          <!-- /> -->
          <VSolitaireCardNull
            v-if="deckTop.isNull"
            @click="onClickCard(deckTop)"
          />
          <!-- <VSolitaireCard -->
          <!--   v-else -->
          <!--   :number="deckTop.number" -->
          <!--   :mark="deckTop.mark" -->
          <!--   :isFront="false" -->
          <!--   class="card" -->
          <!--   @click="onClickDeck" -->
          <!-- > -->
          <!-- </VSolitaireCard> -->
          <VSolitaireCard
            v-else
            :number="deckTop.number"
            :mark="deckTop.mark"
            :isFront="false"
            class="card"
            @click="onClickCard(deckTop)"
          >
          </VSolitaireCard>
        </div>
      </div>
      <div class="field">
        <div v-for="(row, index_row) in field" :key="`field-${index_row}`" class="row">
          <div v-for="(card, index_column) in row" :key="`13 * ${card.mark} + ${card.number}`" class="card">
            <VSolitaireCardNull v-if="card.isNull" @click="onClickCard(card)"></VSolitaireCardNull>
            <!-- <VSolitaireCard -->
            <!--   v-else -->
            <!--   :number="card.number" -->
            <!--   :mark="card.mark" -->
            <!--   :isFront="card.isFront" -->
            <!--   :isSelect="card.isSelect" -->
            <!--   :style="styleTop(index_column * 18)" -->
            <!--   @click="onClickFieldCard(index_row, index_column)" -->
            <!--   class="card" -->
            <!--   > -->
            <!-- </VSolitaireCard> -->
            <VSolitaireCard
              v-else
              :number="card.number"
              :mark="card.mark"
              :isFront="card.isFront"
              :isSelect="card.isSelect"
              :style="styleTop(index_column * 18)"
              @click="onClickCard(card)"
              class="card"
              >
            </VSolitaireCard>
          </div>
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
      hands: [] as Array<SolitaireCard>,
      selectedCard: null as SolitaireCard|null,
      selectedFieldRow: -1 as number,
    }
  },
  computed: {
    deckTop(): SolitaireCard {
      if (Array.isArray(this.decks)) {
        return this.decks[this.decks.length - 1]
      }
      return new SolitaireCard(0, 0, true, true)
    },
    handTop(): SolitaireCard {
      if (Array.isArray(this.hands)) {
        return this.hands[this.hands.length - 1]
      }
      return new SolitaireCard(0, 0, true, true)
    },
  },
  methods: {
    styleTop(num: number) {
      return { '--top': `${num}px` }
    },
    // getFieldBottomCard(x: number) {
    //   const column = this.field[x]
    //   return column[column.length - 1]
    // },
    getPairCard(x: number) {
      return this.pairs[x][this.pairs[x].length - 1]
    },
    isSelect(row: number, column: number) {
      return true
    },
    isPairCard(card: SolitaireCard): boolean {
      let result = false
      this.pairs.forEach((pair) => {
        pair.forEach((pairCard) => {
          if (card === pairCard) {
            result = true
          }
        })
      })
      return result
    },
    isHandCard(card: SolitaireCard): boolean {
      return true
    },
    isDeckCard(card: SolitaireCard): boolean {
      let result = false
      this.decks.forEach((deckCard) => {
        if (card === deckCard) {
          result = true
        }
      })
      return result
    },
    isFieldCard(card: SolitaireCard): boolean {
      let result = false
      this.field.forEach((row) => {
        row.forEach((fieldCard) => {
          if (card === fieldCard) {
            result = true
          }
        })
      })
      return result
    },
    getTargetPair(card: SolitaireCard) {
      let result = this.pairs[0]
      this.pairs.forEach((pair) => {
        pair.forEach((pairCard) => {
          if (card === pairCard) {
            result = pair
          }
        })
      })
      return result
    },
    getTargetFieldRow(card: SolitaireCard) {
      let result = this.field[0]
      this.field.forEach((row) => {
        row.forEach((fieldCard) => {
          if (card === fieldCard) {
            result = row
          }
        })
      })
      return result
    },
    getFieldBottomCard(card: SolitaireCard): SolitaireCard { // 引数のフィールドカードのボトムを取得する
      let result: SolitaireCard = new SolitaireCard(0, 0, true, true)
      this.field.forEach((row) => {
        row.forEach((fieldCard) => {
          if (card === fieldCard) {
            result = row[row.length - 1]
          }
        })
      })
      return result
    },
    onClickCard(card: SolitaireCard) : void {
      // すでに選択中のカードの有無と,今選択したカードによって挙動を変更する
      if (this.selectedCard) {
        // 選択先のカードがペアの場合
        if (this.isPairCard(card)) {
          const pair = this.getTargetPair(card)
          const bottomCard = pair[pair.length - 1]
          // 選択中のカードがペアに置くことができるか判定
          if ((bottomCard.mark === this.selectedCard.mark || bottomCard.isNull)
            && bottomCard.number === this.selectedCard.number - 1) {
            pair.push(this.selectedCard)
            // 移動元のカードがフィールドか手札か判断
            if (this.isFieldCard(this.selectedCard)) {
              const row = this.getTargetFieldRow(this.selectedCard)
              row.pop()
              row[row.length - 1].isFront = true
              this.selectedCard = null
            } else if (this.isHandCard(this.selectedCard)) {
              this.hands.pop()
              this.hands[this.hands.length - 1].isFront = true
              this.selectedCard = null
            }
          }
        }
      } else {
        // 選択中のカードがない場合
        if (this.isFieldCard(card)) {
          // フィールドのカードを選択した場合
          this.selectedCard = this.getFieldBottomCard(card)
          this.selectedCard.isSelect = true
        } else {
          // フィールド以外
          this.selectedCard = card
          this.selectedCard.isSelect = true
        }

        // 山札ならめくる
        if (this.isDeckCard(card)) {
          this.selectedCard.isSelect = false
          this.selectedCard = null
          this.hands.push(this.deckTop)
          this.decks.pop()
        }
      }
    },
    // onClickFieldCard(x: number, y: number): void {
    //   if (this.selectedCard === null) {
    //     // 選択中のカードがない場合,タップしたカードを選択状態にする
    //     this.getFieldBottomCard(x).isSelect = true
    //     this.selectedCard = this.getFieldBottomCard(x)
    //     this.selectedFieldRow = x
    //   } else {
    //     // 選択中のカードがある場合,タップしたカードに応じて選択状態やアクションを決定する
    //     this.selectedCard.isSelect = false
    //     this.getFieldBottomCard(x).isSelect = true
    //     this.selectedCard = this.getFieldBottomCard(x)
    //     this.selectedFieldRow = x
    //   }
    // },
    onClickDeck() {
      this.selectedCard = null
      this.hands.push(this.deckTop)
      this.decks.pop()
    },
    onClickDeckEmpty() {
      this.hands.reverse().forEach((hand) => {
        if (hand.isNull) return
        this.decks.push(hand)
      })
      this.hands = new Array(0)
      this.hands.push(new SolitaireCard(0, 0, true, true))
    },
    onClickHand() {
      this.selectedCard = this.handTop
      this.getSelectedCard()
    },
    onClickPairCard(x: number): void {
      if (this.selectedCard === null) {
        console.log(this.getPairCard(x))
      } else {
        console.log('hoge')
        if ((this.selectedCard.number === 1 && this.getPairCard(x).isNull)
            || (this.selectedCard.number === this.getPairCard(x).number + 1 && this.selectedCard.mark === this.getPairCard(x).mark)) {
          console.log('move')
          this.pairs[x].push(this.selectedCard)
          this.selectedCard = null
          const selectedRow = this.field[this.selectedFieldRow]
          selectedRow.pop()
          selectedRow[selectedRow.length - 1].isFront = true
        }
      }
    },
    getSelectedCard() : SolitaireCard | undefined {
      let result
      this.allCards.forEach((card) => {
        if (card.isSelect) {
          result = card
        }
      })
      console.log(result)
      return result
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
      this.field[i].push(new SolitaireCard(0, 0, false, true))
      for (let j = 0; j <= i; j++) {
        this.field[i].push(this.allCards[count++])
        this.field[i][j].isFront = (i === j - 1)
      }
    }

    this.decks = new Array(0)
    this.decks.push(new SolitaireCard(0, 0, true, true))
    for (let i = count; i < this.allCards.length; i++) {
      this.decks.push(this.allCards[i])
    }

    this.hands = new Array(0)
    this.hands.push(new SolitaireCard(0, 0, true, true))

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

      > .hand {
        display: flex;
        position: absolute;
        right: 70px;
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
          > .card {
            position: absolute;
            width: 100%;
            top: var(--top);
          }
        }
      }
    }
  }
}
</style>
