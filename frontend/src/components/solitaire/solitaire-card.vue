<template>
  <div>
    <v-card v-if="isFront" class="solitaire-card" color="white" :class="[colorClass, { 'is-select': isSelect }]">
      <v-card-text class="title">
        <span class="mark">
          {{ markDisplay }}
        </span>
        <span class="number">
          {{ numberDisplay }}
        </span>
      </v-card-text>
      <v-card-text class="bottom">
        <span class="number">
          {{ numberDisplay }}
        </span>
        <span class="mark">
          {{ markDisplay }}
        </span>
      </v-card-text>
    </v-card>
    <v-card v-else class="solitaire-card" color="red">
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'solitaire-card',
  props: {
    number: {
      type: Number,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
    },
    isFront: {
      type: Boolean,
      required: true,
    },
    isSelect: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    numberDisplay() {
      if (this.number === 1) return 'A'
      if (this.number <= 10) return this.number
      return ['J', 'Q', 'K'][this.number - 11]
    },
    markDisplay() {
      switch (this.mark) {
        case 0:
          return '♤'
        case 1:
          return '♡'
        case 2:
          return '◇'
        case 3:
          return '♧'
        default:
          return ''
      }
    },
    colorClass() {
      if (this.mark === 0 || this.mark === 3) return 'color-black'
      return 'color-red'
    },
  },
})
</script>

<style lang="scss">

.solitaire-card {
  width: 40px;
  height: 60px;
  box-shadow: 0 0 2px 2px black;

  &.is-select {
    box-shadow: 0 0 4px 4px blue;
  }

  &.color-red {
    > .title {
      color: red;
    }

    > .bottom{
      color: red;
    }
  }

  &.color-black {
    > .title {
      color: black;
    }

    > .bottom{
      color: black;
    }
  }

  > .title {
    height: 100%;
    padding: 0;
    display: flex;
    font-size: 18px;
    margin-bottom: -18px;

    > .mark {
      margin-right: auto;
    }

    > .number {
      margin-left: auto;
      margin-right: 2px;
      transform: scale(1.25, 1.0);
    }
  }

  > .bottom{
    height: 100%;
    padding: 0;
    display: flex;
    font-size: 18px;

    > .number {
      margin-right: auto;
      margin-left: 2px;
      transform: scale(1.25, 1.0);
    }

    > .mark {
      margin-left: auto;
    }
  }

}

</style>
