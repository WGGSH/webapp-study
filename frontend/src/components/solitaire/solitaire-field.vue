<template>
  <div class="solitaire-container">
    ソリティア
    <div class="border">
      <div class="top-area">
        <div class="pairs">
          <div v-for="(row, index_row) in pairs" :key="`pairs-${index_row}`" class="row">
            <div v-for="(card) in row" :key="`13 * ${card.mark} + ${card.number}`" class="card">
              <VSolitaireCardNull v-if="card.isNull" @click="onClickCard(card)"></VSolitaireCardNull>
              <VSolitaireCard v-else
                :number="card.number"
                :mark="card.mark"
                :isFront="card.isFront"
                @click="onClickCard(card)"
                class="card"
              />
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
            @click="onClickCard(handTop)"
          />
        </div>
        <div class="deck">
          <VSolitaireCardNull
            v-if="deckTop.isNull"
            @click="onClickDeckBottom"
          />
          <VSolitaireCard
            v-else
            :number="deckTop.number"
            :mark="deckTop.mark"
            :isFront="false"
            class="card"
            @click="onClickCard(deckTop)"
          />
        </div>
      </div>
      <div class="field">
        <div v-for="(row, index_row) in field" :key="`field-${index_row}`" class="row">
          <div v-for="(card, index_column) in row" :key="`13 * ${card.mark} + ${card.number}`" class="card">
            <VSolitaireCardNull v-if="card.isNull" @click="onClickCard(card)"></VSolitaireCardNull>
            <VSolitaireCard
              v-else
              :number="card.number"
              :mark="card.mark"
              :isFront="card.isFront"
              :isSelect="card.isSelect"
              :style="styleTop(index_column * 18)"
              @click="onClickCard(card)"
              class="card"
            />
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
    getPairCard(x: number) {
      return this.pairs[x][this.pairs[x].length - 1]
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
      let result = false
      this.hands.forEach((handCard) => {
        if (card === handCard) {
          result = true
        }
      })
      return result
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
    movePair(card: SolitaireCard) {
      const pair = this.getTargetPair(card)
      const bottomCard = pair[pair.length - 1]
      if (!bottomCard || !this.selectedCard) return
      // 選択中のカードがペアに置くことができるか判定
      if ((bottomCard.mark === this.selectedCard.mark || bottomCard.isNull)
        && bottomCard.number === this.selectedCard.number - 1) {
        pair.push(this.selectedCard)
        // 移動元のカードがフィールドか手札か判断
        if (this.isFieldCard(this.selectedCard)) {
          const row = this.getTargetFieldRow(this.selectedCard)
          row.pop()
          row[row.length - 1].isFront = true
          this.selectedCard.isSelect = false
          this.selectedCard = null
        } else if (this.isHandCard(this.selectedCard)) {
          this.hands.pop()
          this.hands[this.hands.length - 1].isFront = true
          this.selectedCard.isSelect = false
          this.selectedCard = null
        }

        // ゲームクリアチェック
        const isClear = this.pairs.every((targetPair) => {
          return targetPair.length === 14
        })
        if (isClear) {
          alert('clear!!!')
        }
      }
    },
    draw() {
      if (this.selectedCard) {
        this.selectedCard.isSelect = false
        this.selectedCard = null
      }
      this.hands.push(this.deckTop)
      this.decks.pop()
    },
    moveFieldToFieldCard(card: SolitaireCard) {
      if (!this.isFieldCard(card)) return
      if (!this.selectedCard || !this.isFieldCard(this.selectedCard)) return

      // 移動元のカードの重なりを取得する
      const fromRow = this.getTargetFieldRow(this.selectedCard)
      const targetRow = this.getTargetFieldRow(card)

      // 移動元のカードのうち,最も上に配置された表のカードを取得
      let fromTopCard: SolitaireCard | undefined
      for (let i = 0; i < fromRow.length; i++) {
        if (fromRow[i].isFront) {
          fromTopCard = fromRow[i]
          break
        }
      }

      if (!fromTopCard) return

      // 移動先のカードのうち,最も下に配置されたカードを取得
      const targetBottomCard = this.getFieldBottomCard(card)

      // 移動元の上のカードが,移動先の下のカードより数字が1小さく,色が違えば移動可能
      if (fromTopCard.number === targetBottomCard.number - 1
        && fromTopCard.mark % 2 !== targetBottomCard.mark % 2) {
        // 移動成功
        for (let i = 0; i < fromRow.length; i++) {
          if (fromRow[i].isFront) {
            const newRow = fromRow.splice(i)
            newRow.forEach((newCard) => {
              targetRow.push(newCard)
            })
            if (!fromRow[i - 1].isNull) fromRow[i - 1].isFront = true
            break
          }
        }
        this.selectedCard.isSelect = false
        this.selectedCard = null
        return
      }

      // 移動元の上のカードがKの場合,移動先が null なら移動可能
      if (fromTopCard.number === 13 && targetBottomCard.isNull) {
        for (let i = 0; i < fromRow.length; i++) {
          if (fromRow[i].isFront) {
            const newRow = fromRow.splice(i)
            newRow.forEach((newCard) => {
              targetRow.push(newCard)
            })
            if (!fromRow[i - 1].isNull) fromRow[i - 1].isFront = true
            break
          }
        }
        this.selectedCard.isSelect = false
        this.selectedCard = null
        return
      }

      // 移動失敗
      this.selectedCard.isSelect = false
      this.selectedCard = null
    },
    moveHandToField(card: SolitaireCard) {
      if (!this.selectedCard) return
      if (!this.isHandCard(this.selectedCard)) return
      if (!this.isFieldCard(card)) return

      const targetRow = this.getTargetFieldRow(card)
      const bottomCard = targetRow[targetRow.length - 1]
      if (bottomCard.isNull) {
        if (this.selectedCard.number === 13) {
          targetRow.push(this.selectedCard)
          this.selectedCard.isSelect = false
          this.selectedCard = null
          this.hands.pop()
          return
        }
      }

      if (this.selectedCard.number === bottomCard.number - 1
        && this.selectedCard.mark % 2 !== bottomCard.mark % 2) {
        targetRow.push(this.selectedCard)
        this.selectedCard.isSelect = false
        this.selectedCard = null
        this.hands.pop()
      }
    },
    onClickDeckBottom() {
      this.hands.reverse().forEach((card) => {
        if (card.isNull) return
        this.decks.push(card)
      })
      this.hands = new Array(0)
      this.hands.push(new SolitaireCard(0, 0, true, true))
    },
    onClickCard(card: SolitaireCard) : void {
      // すでに選択中のカードの有無と,今選択したカードによって挙動を変更する
      if (this.selectedCard) {
        // 選択先のカードがペアの場合
        if (this.isPairCard(card)) {
          this.movePair(card)
        }
        // 選択先のカードが山札の場合
        if (this.isDeckCard(card)) {
          this.draw()
        }
        // 選択先のカードがフィールドの場合
        if (this.isFieldCard(card)) {
          if (this.isHandCard(this.selectedCard)) {
            this.moveHandToField(card)
          }
          if (this.isFieldCard(this.selectedCard)) {
            this.moveFieldToFieldCard(card)
          }
        }
        // 選択先のカードが手札の場合
        if (this.isHandCard(card)) {
          this.selectedCard.isSelect = false
          this.selectedCard = card
          this.selectedCard.isSelect = true
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
          this.draw()
        }
      }
    },
    shuffle() {
      const cloneCards: Array<SolitaireCard> = [...this.allCards]
      const size = this.allCards.length
      for (let i = 0; i < 10000; i++) {
        const index1: number = Math.floor(Math.random() * size)
        const index2: number = Math.floor(Math.random() * size)
        const tmp: SolitaireCard = cloneCards[index1]
        cloneCards[index1] = cloneCards[index2]
        cloneCards[index2] = tmp
      }
      this.allCards = cloneCards
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
