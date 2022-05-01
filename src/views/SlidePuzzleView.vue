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
  methods: {
    onClickStartButton() {
      (this.$refs.field as any).initialize()
    },
    onClickShuffleButton() {
      (this.$refs.field as any).shuffle(this.size * this.size * 100)
    },
  },
})
</script>
