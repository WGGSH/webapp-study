<template>
  <div class="v-button">
    <button @click="onClick" class="button">
      <slot>ボタン</slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'vButton',
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
})
</script>
