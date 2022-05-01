<template>
  <div>
    slide puzzle
    <vButton @click="onClickStartButton"></vButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import vButton from '../components/util/v-button.vue'

export default defineComponent({
  name: 'SlidePuzzleView',
  components: {
    vButton,
  },
  methods: {
    onClickStartButton() {
      alert('fuga')
    },
  },
})
</script>
