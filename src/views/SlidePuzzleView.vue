<template>
  <div>
    <div>slide puzzle</div>
    <v-text-field v-model.number="size" type="number" :min="min" :max="max"/>
    <v-btn @click="onClickStartButton" color="white">スタート</v-btn>
    <v-btn @click="onClickShuffleButton" color="white">シャッフル</v-btn>
    <PuzzleField :selectedSize="size" ref="field"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PuzzleField from '../components/slide-puzzle/puzzle-field.vue'

export default defineComponent({
  name: 'SlidePuzzleView',
  components: {
    PuzzleField,
  },
  data() {
    return {
      size: 4,
      min: 2,
      max: 10,
    }
  },
  computed: {
    field() : any { // eslint-disable-line
      return this.$refs.field as any // eslint-disable-line
    },
  },
  methods: {
    onClickStartButton() {
      this.field.initialize()
      this.field.shuffle(this.size * this.size * 100)
    },
    onClickShuffleButton() {
      this.field.shuffle(this.size * this.size * 100)
    },
  },
})
</script>
