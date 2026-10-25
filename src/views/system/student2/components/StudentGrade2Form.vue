<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :inline-message="true"
  >
    <el-table :data="formData" class="-mt-10px">
      <el-table-column label="序号" type="index" width="100" />
       <el-table-column label="名字" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.name`" :rules="formRules.name" class="mb-0px!">
            <el-input v-model="row.name" placeholder="请输入名字" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="班主任" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.teacher`" :rules="formRules.teacher" class="mb-0px!">
            <el-input v-model="row.teacher" placeholder="请输入班主任" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="60">
        <template #default="{ $index }">
          <el-button @click="handleDelete($index)" link>—</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
  <el-row justify="center" class="mt-3">
    <el-button @click="handleAdd" round>+ 添加学生班级</el-button>
  </el-row>
</template>
<script setup lang="ts">
import { Student2Api } from '@/api/system/student2'

const props = defineProps<{
  studentId: number // 学生编号（主表的关联字段）
}>()
const formLoading = ref(false) // 表单的加载中
const formData = ref<any[]>([])
const formRules = reactive({
  studentId: [{ required: true, message: '学生编号不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  teacher: [{ required: true, message: '班主任不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.studentId,
  async (val) => {
    // 1. 重置表单
    formData.value = []
    // 2. val 非空，则加载数据
    if (!val) {
      return;
    }
    try {
      formLoading.value = true
      formData.value = await Student2Api.getStudentGrade2ListByStudentId(val)
    } finally {
      formLoading.value = false
    }
  },
  { immediate: true }
)

/** 新增按钮操作 */
const handleAdd = () => {
  const row = {
    id: undefined,
    studentId: undefined,
    name: undefined,
    teacher: undefined
  }
  row.studentId = props.studentId as any
  formData.value.push(row)
}

/** 删除按钮操作 */
const handleDelete = (index) => {
  formData.value.splice(index, 1)
}

/** 表单校验 */
const validate = () => {
  return formRef.value.validate()
}

/** 表单值 */
const getData = () => {
  return formData.value
}

defineExpose({ validate, getData })
</script>