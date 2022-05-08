<template>
  <div>
    <v-card class="solitaire-card" color="white" :class="colorClass">
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
    direction: {
      type: Boolean,
      required: true,
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
          return '♠'
        case 1:
          return '♥'
        case 2:
          return '◆'
        case 3:
          return '♣'
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
  width: 80px;
  height: 120px;

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
    font-size: 24px;
    margin-bottom: -24px;

    > .mark {
      margin-right: auto;
    }

    > .number {
      margin-left: auto;
      margin-right: 4px;
      transform: scale(1.25, 1.0);
    }
  }

  > .bottom{
    height: 100%;
    padding: 0;
    display: flex;
    font-size: 24px;

    > .number {
      margin-right: auto;
      margin-left: 4px;
      transform: scale(1.25, 1.0);
    }

    > .mark {
      margin-left: auto;
    }
  }

}

</style>
