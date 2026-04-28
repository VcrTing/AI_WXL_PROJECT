// types/MSalaryType.ts
import { z } from 'zod';
import {
  zodBaseSchema,
  zodAuditSchema,
  createSchema,
  updateSchema,
  zodPaginationQuerySchema,
} from '../__zod_common';

// ========== 工资类型特有字段 ==========
const salaryTypeSpecific = {
  name: z.string().nullable().optional(),
  code: z.number().int().nullable().optional(),
};

// ========== 完整 Schema ==========
// 合并基础字段 + 审计字段（updatedBy） + 特有字段
export const zodMSalaryTypeSchema = zodBaseSchema
  .merge(zodAuditSchema)
  .extend(salaryTypeSpecific);

export type MSalaryType = z.infer<typeof zodMSalaryTypeSchema>;

// ========== 创建 DTO ==========
export const zodMSalaryTypeCreateSchema = createSchema(zodMSalaryTypeSchema, {
  name: z.string().min(1, '类型名称不能为空'),
  code: z.number().int().min(1, '编码必须为正整数'),
});

export type MSalaryTypeCreate = z.infer<typeof zodMSalaryTypeCreateSchema>;

// ========== 更新 DTO ==========
export const zodMSalaryTypeUpdateSchema = updateSchema(zodMSalaryTypeCreateSchema);
export type MSalaryTypeUpdate = z.infer<typeof zodMSalaryTypeUpdateSchema>;

// ========== 查询参数 ==========
export const zodMSalaryTypeQuerySchema = zodPaginationQuerySchema.extend({
  name: z.string().optional(),
  code: z.coerce.number().int().optional(),
});

export type MSalaryTypeQuery = z.infer<typeof zodMSalaryTypeQuerySchema>;