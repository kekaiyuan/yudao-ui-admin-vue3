import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 学生课程信息 */
export interface StudentCourse2 {
          id: number; // 编号
          studentId?: number; // 学生编号
          name?: string; // 名字
          score?: number; // 分数
}

/** 学生班级信息 */
export interface StudentGrade2 {
          id: number; // 编号
          studentId?: number; // 学生编号
          name?: string; // 名字
          teacher?: string; // 班主任
}

/** 学生信息 */
export interface Student2 {
          id: number; // 编号
          name?: string; // 名字
          birthday?: string | Dayjs; // 出生日期
          description?: string; // 简介
            studentcourse2s?: StudentCourse2[]
          studentgrade2s?: StudentGrade2[]
}

// 学生 API
export const Student2Api = {
  // 查询学生分页
  getStudent2Page: async (params: any) => {
    return await request.get({ url: `/system/student2/page`, params })
  },

  // 查询学生详情
  getStudent2: async (id: number) => {
    return await request.get({ url: `/system/student2/get?id=` + id })
  },

  // 新增学生
  createStudent2: async (data: Student2) => {
    return await request.post({ url: `/system/student2/create`, data })
  },

  // 修改学生
  updateStudent2: async (data: Student2) => {
    return await request.put({ url: `/system/student2/update`, data })
  },

  // 删除学生
  deleteStudent2: async (id: number) => {
    return await request.delete({ url: `/system/student2/delete?id=` + id })
  },

  /** 批量删除学生 */
  deleteStudent2List: async (ids: number[]) => {
    return await request.delete({ url: `/system/student2/delete-list?ids=${ids.join(',')}` })
  },

  // 导出学生 Excel
  exportStudent2: async (params) => {
    return await request.download({ url: `/system/student2/export-excel`, params })
  },

// ==================== 子表（学生课程） ====================

  // 获得学生课程列表
  getStudentCourse2ListByStudentId: async (studentId) => {
    return await request.get({ url: `/system/student2/student-course2/list-by-student-id?studentId=` + studentId })
  },

// ==================== 子表（学生班级） ====================

  // 获得学生班级列表
  getStudentGrade2ListByStudentId: async (studentId) => {
    return await request.get({ url: `/system/student2/student-grade2/list-by-student-id?studentId=` + studentId })
  }
}