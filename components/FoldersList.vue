<template>
  <div class="folder-tree">
    <div v-for="file in tree.files" :key="file" class="item">
      <i class="icon-file"></i>
      <span>{{ file }}</span>
    </div>

    <!-- Render folders recursively -->
    <div @click="selectFolder(folder)"
         v-for="(folder, folderName) in tree.folders"
         :key="folderName"
         class="item">
      <div class="folder">
        <i class="icon-folder"></i>
        <span>{{ folderName }}</span>
      </div>

<!--      <div class="nested">-->
<!--        <FoldersList :tree="folder"/>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import type {IFolder} from "~/types/types";

const props = defineProps<{
  tree: {
    files: string[];
    folders: Record<string, any>;
  };
}>();

const emit = defineEmits(["select-folder"]);

const selectFolder = (folder: IFolder) => {
  emit("select-folder", folder);
}
</script>

<style scoped>
.folder-tree {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
}

.item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.folder {
  cursor: pointer;
}

.icon-folder::before {
  content: "📁";
}

.icon-file::before {
  content: "📄";
}

/* Styling for nested folders to add indentation */
.nested {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: 20px;
  align-items: flex-start;
}
</style>
