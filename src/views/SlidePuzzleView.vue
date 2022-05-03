<template>
  <div>
    <p>slide puzzle</p>
    <label for="hoge">
    <input v-model="size" type="number" label="hoge" :min="min" :max="max"/>
    </label>
    <VButton @click="onClickStartButton">スタート</VButton>
    <VButton @click="onClickShuffleButton">シャッフル</VButton>
    <PuzzleField :selectedSize="size" ref="field"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VButton from '../components/util/v-button.vue'
import PuzzleField from '../components/slide-puzzle/puzzle-field.vue'

export default defineComponent({
  name: 'SlidePuzzleView',
  components: {
    VButton,
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
