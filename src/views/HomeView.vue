<template>
  <div class="home">
    <el-button type="primary" @click="openDialogAddUser">添加用户数据</el-button>

    <el-button type="primary" @click="handleUploadFile">
      上传图片
      <input ref="inputImage" type="file" style="display: none" name="image" accept="image/*" />
    </el-button>
    <img :src="imageURl" style="border: 1px solid pink; margin-left: 20px" />
  </div>
  <section class="table">
    <el-table :data="data.tableData" border v-loading="loading">
      <el-table-column prop="user_id" label="用户ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-link :underline="false" type="danger" @click="deleteUser(row)">删除</el-link>
          <el-link style="margin-left: 20px" :underline="false" type="primary" @click="updateUser(row)">编辑</el-link>
        </template>
      </el-table-column>
    </el-table>
  </section>
  <DialogAddUser ref="dialogAddUser" title="新增用户" @success="qryUserList"></DialogAddUser>
</template>

<script setup lang="ts">
import { deleteUserById, getUserList, updateUserInfo, uploadFile } from '@/axios/api'
import type { IGetUserListItem } from '@/axios/types'
import DialogAddUser from '@/components/DialogAddUser.vue'
import { IOpenDialogProps } from '@/ui-type'
import { onMounted, reactive, ref } from 'vue'

type IData = {
  tableData: Array<IGetUserListItem>
}

const userId = 'D67E7D71AFA1F'
const data = reactive<IData>({
  tableData: [],
})
const dialogAddUser = ref<IOpenDialogProps>()
const loading = ref(false)
const imageURl = ref('')

// 查询
const qryUserList = async () => {
  loading.value = true
  const res = await getUserList({ userId: userId })
  loading.value = false

  if (res.code === 200) {
    data.tableData = res.data
  }
}

const openDialogAddUser = () => {
  dialogAddUser.value?.openDialog({ userId })
}

// 更新
const updateUser = async (row: IGetUserListItem) => {
  const res = await updateUserInfo({ name: '更新用户数据', age: 19 })
  console.log(res, row)
}

// 删除
const deleteUser = async (row: IGetUserListItem) => {
  const res = await deleteUserById({ id: row.id })
  console.log(res)
}

// 上传图片
const inputImage = ref<HTMLInputElement>()
const imageChanged = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files: FileList = target.files as FileList
  const formData = new FormData()
  formData.append('file', files[0])
  const res = await uploadFile(formData)
  if (res.code === 200) {
    imageURl.value = res.data as string
  }
}

const handleUploadFile = () => {
  if (!inputImage.value) {
    return
  }

  // 清空上次上传的记录
  inputImage.value.value = ''
  inputImage.value.removeEventListener('change', imageChanged)
  // 触发上传图片
  inputImage.value.click()
  inputImage.value.addEventListener('change', imageChanged)
}

onMounted(() => {
  qryUserList()
})
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
}
button + button {
  margin-left: 20px;
}
.table {
  padding: 20px;
}
</style>
