<template>
  <el-form ref="ruleFormRef" label-width="70px" :model="ruleForm" :rules="rules">
    <el-form-item label="用户名:" prop="userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-button type="primary" :disabled="disabled" :loading="loading" @click="login">登录</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const ruleForm = reactive({
  userName: 'admin',
  password: '123456abc',
})
const rules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const disabled = computed(() => !ruleForm.userName || !ruleForm.password)
const loading = ref(false)

const router = useRouter()
const login = async () => {
  loading.value = true
  router.push({ path: '/home', query: { ...ruleForm } })
  loading.value = false
}
</script>

<style scoped lang="scss">
.el-form {
  text-align: center;
  border: 0.1rem solid #ddd;
  width: 40rem;
  height: 30rem;
  padding: 6rem 2rem 2rem;
  border-radius: 1rem;
  margin: calc(100vh / 2 - 30rem / 2) auto;
  .el-button {
    width: 10rem;
    margin-top: 2rem;
  }
}
</style>
