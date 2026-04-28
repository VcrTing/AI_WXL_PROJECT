// types/MSalary.ts
import { z } from 'zod';
import { zodBaseSchema, zodAuditSchema, createSchema, updateSchema, zodPaginationQuerySchema } from '../__zod_common';

// 主表特有字段
const mSalarySpecific = {
  connectXUserId: z.string().nullable().optional(),
  ledgerStartTime: z.iso.datetime().optional(),
  ledgerEndTime: z.iso.datetime().optional(),
  belongMonth: z.number().int().nullable().optional(),
  timeDayNum: z.number().int().nullable().optional(),
  needWorkDayNum: z.number().int().nullable().optional(),
  name: z.string().nullable().optional(),
  remark: z.string().nullable().optional(),
  salaryTotal: z.number().nullable().optional(),
  salaryAdditional: z.number().nullable().optional(),
  payStatus: z.number().int().nullable().optional(),
};

// 合并基础 + 审计 + 特有
export const zodMSalarySchema = zodBaseSchema.merge(zodAuditSchema).extend(mSalarySpecific);

export type MSalary = z.infer<typeof zodMSalarySchema>;

// 创建 DTO
export const zodMSalaryCreateSchema = createSchema(zodMSalarySchema, {
  connectXUserId: z.string().min(1, '用户ID不能为空'),
  belongMonth: z.number().int().min(202001, '月份格式为YYYYMM'),
});

export type MSalaryCreate = z.infer<typeof zodMSalaryCreateSchema>;

// 更新 DTO
export const zodMSalaryUpdateSchema = updateSchema(zodMSalaryCreateSchema);
export type MSalaryUpdate = z.infer<typeof zodMSalaryUpdateSchema>;

// 查询参数（扩展分页）+ 特有查询条件
export const zodMSalaryQuerySchema = zodPaginationQuerySchema.extend({
  connectXUserId: z.string().optional(),
  belongMonth: z.coerce.number().int().optional(),
  payStatus: z.coerce.number().int().optional(),
  ledgerStartFrom: z.string().optional(),
  ledgerStartTo: z.string().optional(),
  ledgerEndFrom: z.string().optional(),
  ledgerEndTo: z.string().optional(),
});

export type MSalaryQuery = z.infer<typeof zodMSalaryQuerySchema>;