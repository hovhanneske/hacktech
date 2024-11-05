<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <slot name="content"/>
      <input @keydown.enter="confirm" v-model="inputText" type="text" placeholder="Enter text" class="modal-input"/>
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
      <div class="modal-actions">
        <AppButton @click="confirm">Confirm</AppButton>
        <AppButton button-type="danger" @click="close">Close</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue", "confirm"]);

const inputText = ref('');
const isOpen = ref(props.modelValue);
const errorMessage = ref<string | null>(null);
const close = () => {
  isOpen.value = false;
  inputText.value = "";
  emit('update:modelValue', false)
}

const confirm = () => {
  const errorMessage = validateInput(inputText.value);
  if (errorMessage) {
    showErrorMessage(errorMessage);
    return;
  }

  emit('confirm', inputText.value)
  close()
}

const validateInput = (value: string): null | string => {
  if (!value.length) return "Field is required"
  if (value.length < 2) return "Length must be at last 2 characters";

  const nesting = value.split("/");
  if (nesting.length > 4) return "Maximum nesting level is 3"

  return null;
}

const showErrorMessage = (message: string) => {
  errorMessage.value = message;
}

watch(
    () => props.modelValue,
    (newValue) => {
      isOpen.value = newValue
    }
)
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 300px;

  .modal-input {
    width: 100%;
    padding: 8px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .error-message {
    font-size: 14px;
    color: #f44336;
  }
}
</style>
