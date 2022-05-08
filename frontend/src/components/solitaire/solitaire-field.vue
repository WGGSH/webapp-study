<template>
  <div class="solitaire-container">
    ソリティア
    <div class="border">
      <SolitaireCard :number="1" :mark="1" :direction="true"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SolitaireCard from './solitaire-card.vue'

export default defineComponent({
  name: 'solitaire-field',
  components: {
    SolitaireCard,
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
  }
}
</style>
