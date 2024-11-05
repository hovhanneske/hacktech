<template>
  <div>
    <NuxtRouteAnnouncer/>
    <AppButton @click="showModal = true">
      Add Folder
    </AppButton>

    <AddModal :modelValue="showModal" @update:modelValue="showModal = $event" @confirm="handleConfirm">
      <template #content>
        <h2>Add new Folder/File</h2>
        <p>Please enter some text and confirm</p>
      </template>
    </AddModal>

    <FoldersList :tree="selectedFolder" @select-folder="selectFolder"/>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import type {IFolder} from "~/types/types";

const rootStructure = ref<IFolder>({files: [], folders: {}});

const showModal = ref(false);

const selectedFolder = ref(rootStructure.value);

const selectFolder = (folder: IFolder) => {
  selectedFolder.value = folder;
}
const handleConfirm = (value: string) => {
  addPath(value, rootStructure);
  selectFolder(rootStructure.value);
  localStorage.setItem("folders", JSON.stringify(rootStructure.value));
}

const isFile = (value: string) => {
  return value.includes('.') && !value.endsWith('.');
}

function addPath(path: string, structure = rootStructure) {
  const parts = path.split('/');
  let current = structure.value;

  parts.forEach(part => {
    if (isFile(part)) {
      if (!current.files.includes(part)) {
        current.files.push(part);
      }
    } else {
      current.folders[part] = current.folders[part] || {files: [], folders: {}};
      current = current.folders[part];
    }
  });
}

</script>