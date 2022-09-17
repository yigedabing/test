<template>
  <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :on-change="handleChange">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { uploadFile } from '@/axios/api'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, file) => {
  console.log(file.raw)
  imageUrl.value = URL.createObjectURL(file.raw!)
}

const handleChange: UploadProps['onChange'] = async (file, files) => {
  console.log(file.name, file.raw, files)
  const raw = file.raw
  if (raw) {
    const formData = new FormData()
    formData.append('name', raw)
    const res = await uploadFile(formData)
    console.log(res)
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  margin: 20px auto;
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
