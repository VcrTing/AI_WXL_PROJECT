// types/common/base.zod.ts
import { z } from 'zod';

// ========== 公共基础 Schema ==========

/** 通用基础字段（主键、逻辑删除、时间戳） */
export const zodBaseSchema = z.object({
  id: z.string().optional(),
  delFlag: z.number().int().default(0),
  createdAt: z.iso.datetime().optional(),
  updatedAt: z.iso.datetime().optional(),
});

/** 带创建人/更新人字段（按需扩展） */
export const zodAuditSchema = z.object({
  createdBy: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
});

/** 通用分页查询参数 */
export const zodPaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});
// 类型在公共文件夹定义好了 = Pager

// ========== 辅助函数（泛型工厂） ==========

/**
 * 生成创建用的 DTO Schema（剔除 id、时间戳、逻辑删除标志）
 * @param baseSchema 原始完整 Schema
 * @param requiredFields 需要强制的字段（用于 extend）
 */
export function createSchema<T extends z.ZodRawShape>(
  base: z.ZodObject<T>,
  requiredFields?: Partial<Record<keyof T, z.ZodTypeAny>>
) {
  const withoutAuto = base.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    delFlag: true,
  } as any);
  if (requiredFields) {
    return withoutAuto.extend(requiredFields);
  }
  return withoutAuto;
}

/**
 * 生成更新用的 DTO Schema（ID 必填，其它字段可选）
 */
export function updateSchema<T extends z.ZodRawShape>(
  createSchema: z.ZodObject<T>
) {
  return createSchema.partial().extend({
    id: z.string().min(1, 'ID不能为空'),
  } as any);
}