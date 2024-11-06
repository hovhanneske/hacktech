<template>
  <Flex gap="middle">
    <template v-if="folderHasItems">
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
    </template>

    <Alert v-else message="Folder is empty" type="warning" />

  </Flex>
</template>

<script setup lang="ts">
import {Flex, Alert} from "ant-design-vue";
import {FolderOpenOutlined, FileDoneOutlined} from "@ant-design/icons-vue";

import type {IFolder} from "~/types/types";

interface IProps {
  tree: {
    files: string[];
    folders: Record<string, any>;
  }
}

const props = defineProps<IProps>();

const emit = defineEmits(["select-folder"]);

const folderHasItems = computed(() => {
  const hasFolders = !!Object.keys(props.tree.folders).length;
  const hasFiles = !!props.tree.files.length;
  return hasFolders || hasFiles;
})

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
