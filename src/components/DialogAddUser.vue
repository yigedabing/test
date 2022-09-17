<template>
  <el-dialog v-bind="$attrs" v-model="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true">
    <el-form :model="ruleForm" status-icon :rules="rules" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" :disabled="disabled" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { addUserInfo } from '@/axios/api'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'

const dialogVisible = ref(false)
const loading = ref(false)
const userId = ref('')
const emits = defineEmits<{ (event: 'success', isOk: boolean): void }>()

const ruleForm = reactive({ name: '', age: '' })
const rules = reactive({
  name: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
  age: [{ required: true, trigger: 'blur', message: '请输入年龄' }],
})

const disabled = computed(() => !ruleForm.name || !ruleForm.age)

const openDialog = (props: Record<string, any>) => {
  dialogVisible.value = true
  userId.value = props.userId
}

const submit = async () => {
  loading.value = true
  const res = await addUserInfo({ userId: userId.value, name: ruleForm.name, age: Number(ruleForm.age) })
  loading.value = false
  if (res.code === 200) {
    ElMessage.success(res.msg)
    dialogVisible.value = false
    emits('success', true)
  } else {
    ElMessage({ type: 'error', message: res.msg })
  }
}

defineExpose({ openDialog })
</script>
