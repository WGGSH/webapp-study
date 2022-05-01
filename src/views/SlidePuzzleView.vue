<template>
  <div>
    <p>slide puzzle</p>
    <input v-model="size" placeholder="4">
    <VButton @click="onClickStartButton"></vButton>
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
    }
  },
  methods: {
    onClickStartButton() {
      (this.$refs.field as any).initialize()
    },
  },
})
</script>
