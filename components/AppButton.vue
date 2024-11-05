<template>
  <button
      :class="['app-button', buttonType]"
      @click="handleClick"
  >
    <slot>Click</slot>
  </button>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  buttonType: {
    type: String,
    default: 'primary',
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
  emit('click', event);
}
</script>

<style scoped lang="scss">
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.primary {
    background-color: #007bff;
    color: white;
  }

  &.secondary {
    background-color: #6c757d;
    color: white;
  }

  &.danger {
    background-color: #dc3545;
    color: white;
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
}
</style>
