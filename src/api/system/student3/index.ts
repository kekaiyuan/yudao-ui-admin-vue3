import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 学生课程信息 */
export interface StudentCourse3 {
          id: number; // 编号
          studentId?: number; // 学生编号
          name?: string; // 名字
          score?: number; // 分数
}

/** 学生班级信息 */
export interface StudentGrade3 {
          id: number; // 编号
          studentId?: number; // 学生编号
          name?: string; // 名字
          teacher?: string; // 班主任
}

/** 学生信息 */
export interface Student3 {
          id: number; // 编号
          name?: string; // 名字
          birthday?: string | Dayjs; // 出生日期
          description?: string; // 简介
  }

// 学生 API
export const Student3Api = {
  // 查询学生分页
  getStudent3Page: async (params: any) => {
    return await request.get({ url: `/system/student3/page`, params })
  },

  // 查询学生详情
  getStudent3: async (id: number) => {
    return await request.get({ url: `/system/student3/get?id=` + id })
  },

  // 新增学生
  createStudent3: async (data: Student3) => {
    return await request.post({ url: `/system/student3/create`, data })
  },

  // 修改学生
  updateStudent3: async (data: Student3) => {
    return await request.put({ url: `/system/student3/update`, data })
  },

  // 删除学生
  deleteStudent3: async (id: number) => {
    return await request.delete({ url: `/system/student3/delete?id=` + id })
  },

  /** 批量删除学生 */
  deleteStudent3List: async (ids: number[]) => {
    return await request.delete({ url: `/system/student3/delete-list?ids=${ids.join(',')}` })
  },

  // 导出学生 Excel
  exportStudent3: async (params) => {
    return await request.download({ url: `/system/student3/export-excel`, params })
  },

// ==================== 子表（学生课程） ====================

  // 获得学生课程分页
  getStudentCourse3Page: async (params) => {
    return await request.get({ url: `/system/student3/student-course3/page`, params })
  },
  // 新增学生课程
  createStudentCourse3: async (data: StudentCourse3) => {
    return await request.post({ url: `/system/student3/student-course3/create`, data })
  },

  // 修改学生课程
  updateStudentCourse3: async (data: StudentCourse3) => {
    return await request.put({ url: `/system/student3/student-course3/update`, data })
  },

  // 删除学生课程
  deleteStudentCourse3: async (id: number) => {
    return await request.delete({ url: `/system/student3/student-course3/delete?id=` + id })
  },

  /** 批量删除学生课程 */
  deleteStudentCourse3List: async (ids: number[]) => {
    return await request.delete({ url: `/system/student3/student-course3/delete-list?ids=${ids.join(',')}` })
  },

  // 获得学生课程
  getStudentCourse3: async (id: number) => {
    return await request.get({ url: `/system/student3/student-course3/get?id=` + id })
  },

// ==================== 子表（学生班级） ====================

  // 获得学生班级分页
  getStudentGrade3Page: async (params) => {
    return await request.get({ url: `/system/student3/student-grade3/page`, params })
  },
  // 新增学生班级
  createStudentGrade3: async (data: StudentGrade3) => {
    return await request.post({ url: `/system/student3/student-grade3/create`, data })
  },

  // 修改学生班级
  updateStudentGrade3: async (data: StudentGrade3) => {
    return await request.put({ url: `/system/student3/student-grade3/update`, data })
  },

  // 删除学生班级
  deleteStudentGrade3: async (id: number) => {
    return await request.delete({ url: `/system/student3/student-grade3/delete?id=` + id })
  },

  /** 批量删除学生班级 */
  deleteStudentGrade3List: async (ids: number[]) => {
    return await request.delete({ url: `/system/student3/student-grade3/delete-list?ids=${ids.join(',')}` })
  },

  // 获得学生班级
  getStudentGrade3: async (id: number) => {
    return await request.get({ url: `/system/student3/student-grade3/get?id=` + id })
  }
}