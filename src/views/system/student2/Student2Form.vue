<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="formData.birthday"
          type="date"
          value-format="x"
          placeholder="选择出生日期"
        />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <Editor v-model="formData.description" height="150px" />
      </el-form-item>
    </el-form>
    <!-- 子表的表单 -->
    <el-tabs v-model="subTabsName">
      <el-tab-pane label="学生课程" name="studentCourse2">
        <StudentCourse2Form ref="studentCourse2FormRef" :student-id="formData.id" />
      </el-tab-pane>
      <el-tab-pane label="学生班级" name="studentGrade2">
        <StudentGrade2Form ref="studentGrade2FormRef" :student-id="formData.id" />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { Student2Api, Student2 } from '@/api/system/student2'
import StudentCourse2Form from './components/StudentCourse2Form.vue'
import StudentGrade2Form from './components/StudentGrade2Form.vue'

/** 学生 表单 */
defineOptions({ name: 'Student2Form' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  birthday: undefined,
  description: undefined
})
const formRules = reactive({
  name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  birthday: [{ required: true, message: '出生日期不能为空', trigger: 'blur' }],
  description: [{ required: true, message: '简介不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 子表的表单 */
const subTabsName = ref('studentCourse2')
const studentCourse2FormRef = ref()
const studentGrade2FormRef = ref()

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await Student2Api.getStudent2(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 校验子表单
  try {
    await studentCourse2FormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'studentCourse2'
    return
  }
  try {
    await studentGrade2FormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'studentGrade2'
    return
  }
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as Student2
    // 拼接子表的数据
    data.studentCourse2s = studentCourse2FormRef.value.getData()
    data.studentGrade2s = studentGrade2FormRef.value.getData()
    if (formType.value === 'create') {
      await Student2Api.createStudent2(data)
      message.success(t('common.createSuccess'))
    } else {
      await Student2Api.updateStudent2(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    birthday: undefined,
    description: undefined
  }
  formRef.value?.resetFields()
}
</script>