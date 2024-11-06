<template>
  <a-modal v-model:open="isOpen" title="Add Folder" @cancel="close" @ok="confirm">
    <a-space direction="vertical" style="width: 100%">
      <a-input @keydown.enter="confirm" v-model:value="inputText" placeholder="Enter text"/>
      <a-alert v-if="errorMessage" :message="errorMessage" type="error"/>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'

interface IProps {
  modelValue: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits(["update:modelValue", "confirm"]);

const inputText = ref('');
const isOpen = ref(props.modelValue);
const errorMessage = ref<string | null>(null);
const close = () => {
  isOpen.value = false;
  inputText.value = "";
  errorMessage.value = "";
  emit('update:modelValue', false)
}

const confirm = () => {
  const errorMessage = validateInput(inputText.value);
  if (errorMessage) {
    showErrorMessage(errorMessage);
    return;
  }

  emit('confirm', inputText.value);
  close();
}

const validateInput = (value: string): null | string => {
  if (!value.length) return "Field is required";
  if (value.length < 2) return "Length must be at last 2 characters";

  const nesting = value.split("/");
  if (nesting.length > 4) return "Maximum nesting level is 3";

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
</style>
