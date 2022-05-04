<template>
  <div>
    <div>life game</div>
    <v-btn @click="onClickNext">next</v-btn>
    <v-btn @click="onClickAuto">auto</v-btn>
    <v-btn @click="onClickStop">stop</v-btn>
    <LifeGameFiled ref="field"></LifeGameFiled>
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
  computed: {
    field() : any { // eslint-disable-line
      return this.$refs.field as any // eslint-disable-line
    },
  },
  methods: {
    onClickNext(): void {
      this.field.next()
    },
    onClickAuto(): void {
      this.field.autoStart()
    },
    onClickStop(): void {
      this.field.autoStop()
    },
  },
})
</script>
