import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 学生课程信息 */
export interface StudentCourse {
          id: number; // 编号
          studentId?: number; // 学生编号
          name?: string; // 名字
          score?: number; // 分数
}

/** 学生班级信息 */
export interface StudentGrade {
          id: number; // 编号
          studentId?: number; // 学生编号
          name?: string; // 名字
          teacher?: string; // 班主任
}

/** 学生信息 */
export interface Student {
          id: number; // 编号
          name?: string; // 名字
          birthday?: string | Dayjs; // 出生日期
          description?: string; // 简介
            studentcourses?: StudentCourse[]
          studentgrade?: StudentGrade
}

// 学生 API
export const StudentApi = {
  // 查询学生分页
  getStudentPage: async (params: any) => {
    return await request.get({ url: `/system/student/page`, params })
  },

  // 查询学生详情
  getStudent: async (id: number) => {
    return await request.get({ url: `/system/student/get?id=` + id })
  },

  // 新增学生
  createStudent: async (data: Student) => {
    return await request.post({ url: `/system/student/create`, data })
  },

  // 修改学生
  updateStudent: async (data: Student) => {
    return await request.put({ url: `/system/student/update`, data })
  },

  // 删除学生
  deleteStudent: async (id: number) => {
    return await request.delete({ url: `/system/student/delete?id=` + id })
  },

  /** 批量删除学生 */
  deleteStudentList: async (ids: number[]) => {
    return await request.delete({ url: `/system/student/delete-list?ids=${ids.join(',')}` })
  },

  // 导出学生 Excel
  exportStudent: async (params) => {
    return await request.download({ url: `/system/student/export-excel`, params })
  },

// ==================== 子表（学生课程） ====================

  // 获得学生课程列表
  getStudentCourseListByStudentId: async (studentId) => {
    return await request.get({ url: `/system/student/student-course/list-by-student-id?studentId=` + studentId })
  },

// ==================== 子表（学生班级） ====================

  // 获得学生班级
  getStudentGradeByStudentId: async (studentId) => {
    return await request.get({ url: `/system/student/student-grade/get-by-student-id?studentId=` + studentId })
  }
}
