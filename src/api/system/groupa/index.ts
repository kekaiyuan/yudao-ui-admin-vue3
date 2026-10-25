import request from '@/config/axios'
import type { Dayjs } from 'dayjs';

/** 用户组信息 */
export interface GroupA {
          id: number; // 编号
          name?: string; // 名字
          description: string; // 描述
          status?: number; // 状态
  }

// 用户组 API
export const GroupAApi = {
  // 查询用户组分页
  getGroupAPage: async (params: any) => {
    return await request.get({ url: `/system/group-a/page`, params })
  },

  // 查询用户组详情
  getGroupA: async (id: number) => {
    return await request.get({ url: `/system/group-a/get?id=` + id })
  },

  // 新增用户组
  createGroupA: async (data: GroupA) => {
    return await request.post({ url: `/system/group-a/create`, data })
  },

  // 修改用户组
  updateGroupA: async (data: GroupA) => {
    return await request.put({ url: `/system/group-a/update`, data })
  },

  // 删除用户组
  deleteGroupA: async (id: number) => {
    return await request.delete({ url: `/system/group-a/delete?id=` + id })
  },

  /** 批量删除用户组 */
  deleteGroupAList: async (ids: number[]) => {
    return await request.delete({ url: `/system/group-a/delete-list?ids=${ids.join(',')}` })
  },

  // 导出用户组 Excel
  exportGroupA: async (params) => {
    return await request.download({ url: `/system/group-a/export-excel`, params })
  }
}