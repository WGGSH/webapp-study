<template>
  <div>
    <div>life game</div>
    <LifeGameFiled></LifeGameFiled>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LifeGameFiled from '../components/life-game/life-game-field.vue'

export default defineComponent({
  name: 'LifeGameView',
  components: {
    LifeGameFiled,
  },
})
</script>
