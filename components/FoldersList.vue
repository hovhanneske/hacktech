<template>
  <Flex gap="middle">
    <div v-for="file in tree.files" :key="file" class="item">
      <FileDoneOutlined class="icon"/>
      <span class="item-name">{{ file }}</span>
    </div>

    <div @click="selectFolder(folder)"
         v-for="(folder, folderName) in tree.folders"
         :key="folderName"
         class="item">
      <div class="folder">
        <FolderOpenOutlined class="icon"/>
        <span class="item-name">{{ folderName }}</span>
      </div>
    </div>
  </Flex>
</template>

<script setup lang="ts">
import {Flex} from "ant-design-vue";
import {FolderOpenOutlined, FileDoneOutlined} from "@ant-design/icons-vue";

import {defineProps} from 'vue';
import type {IFolder} from "~/types/types";

interface IProps {
  tree: {
    files: string[];
    folders: Record<string, any>;
  }
}
const props = defineProps<IProps>();

const emit = defineEmits(["select-folder"]);

const selectFolder = (folder: IFolder) => {
  emit("select-folder", folder);
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}

.folder {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  font-size: 50px;
}

.item-name {
  font-size: 24px;
}
</style>
