<template>
  <div>
    <div>solitaire</div>
    <SolitaireField/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SolitaireField from '../components/solitaire/solitaire-field.vue'

export default defineComponent({
  name: 'SolitaireView',
  components: {
    SolitaireField,
  },
})
</script>
