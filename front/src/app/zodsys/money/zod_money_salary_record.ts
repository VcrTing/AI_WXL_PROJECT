// types/MSalaryRecord.ts
import { z } from 'zod';
import { zodBaseSchema, createSchema, updateSchema, zodPaginationQuerySchema } from '../__zod_common';

// 子表特有字段（注意 createdBy 单独加，没有 updatedBy）
const recordSpecific = {
  workDay: z.string().nullable().optional(),
  workStartTime: z.string().nullable().optional(),
  workEndTime: z.string().nullable().optional(),
  salaryType: z.number().int().nullable().optional(),
  salary: z.string().nullable().optional(),
  isForWork: z.number().int().nullable().optional(),
  remark: z.string().nullable().optional(),
  connectXUserId: z.string().nullable().optional(),
  connectMSalaryId: z.string().nullable().optional(),
  isFinish: z.number().int().nullable().optional(),
  createdBy: z.string().nullable().optional(),   // 子表有创建人，无更新人
};

// 合并基础 + 特有
export const zodMSalaryRecordSchema = zodBaseSchema.extend(recordSpecific);

export type MSalaryRecord = z.infer<typeof zodMSalaryRecordSchema>;

// 创建 DTO
export const zodMSalaryRecordCreateSchema = createSchema(zodMSalaryRecordSchema, {
  workDay: z.string().min(1, '工作日不能为空'),
  salaryType: z.number().int().min(0, '请选择工资类型'),
});

export type MSalaryRecordCreate = z.infer<typeof zodMSalaryRecordCreateSchema>;

// 更新 DTO
export const zodMSalaryRecordUpdateSchema = updateSchema(zodMSalaryRecordCreateSchema);
export type MSalaryRecordUpdate = z.infer<typeof zodMSalaryRecordUpdateSchema>;

// 查询参数（扩展分页）+ 特有条件
export const zodMSalaryRecordQuerySchema = zodPaginationQuerySchema.extend({
  salaryType: z.coerce.number().int().optional(),
  isFinish: z.coerce.number().int().optional(),
  startWorkDay: z.string().optional(),
  endWorkDay: z.string().optional(),
});

export type MSalaryRecordQuery = z.infer<typeof zodMSalaryRecordQuerySchema>;