<template>
  <div>
    <NuxtRouteAnnouncer/>

    <div class="container">
      <a-button @click="showModal = true" type="primary">Add Folder</a-button>

     <main>
       <AddModal :modelValue="showModal" @update:modelValue="showModal = $event" @confirm="handleConfirm"/>
     </main>

      <FoldersList :tree="selectedFolder" @select-folder="selectFolder"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import type {IFolder} from "~/types/types";
import {getSavedFolders} from "~/helpers/storage";

useSeoMeta({
  title: 'Add folders and Files',
  ogTitle: 'Add folders and Files',
  description: 'Create new folders and files.',
  ogDescription: 'Create new folders and files.'
})

const rootStructure = ref<IFolder>({files: [], folders: {}});

const showModal = ref(false);

const selectedFolder = ref(rootStructure.value);

const selectFolder = (folder: IFolder) => {
  selectedFolder.value = folder;
}
const handleConfirm = (value: string) => {
  addPath(value, rootStructure);
  selectFolder(rootStructure.value);
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

  localStorage.setItem("folders-structure", JSON.stringify(rootStructure.value));
}

onMounted(() => {
  const data = getSavedFolders();
  if(data) {
    rootStructure.value.folders = data.folders;
    rootStructure.value.files = data.files;
  }
})

</script>

<style scoped lang="scss">
.container {
  padding: 20px 50px;

  main {
    margin-top: 20px;
  }
}
</style>