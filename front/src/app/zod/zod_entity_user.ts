
import z from "zod";
import { zodBaseForm } from "./zod_entity_base";
import zod_tool from "@/tool/web/zod_tool";

// 用户登录表单
export const zodUserFormLogin = z.object({
    username: z.string().min(3, zod_tool.nonull()),
    password: z.string().min(8, zod_tool.nonull())
})
export type UserFormLogin = z.infer<typeof zodUserFormLogin>;

// 用户资料表单
export const zodUserFormInfo = z.object({
    username: z.string().min(3, zod_tool.nonull()),
    realname: z.string().min(3, zod_tool.nonull()),
    avatar: z.string().nullable(),
})
export type UserFormInfo = z.infer<typeof zodUserFormInfo>;

// 标准用户
export const zodUser = zodUserFormLogin.extend(zodUserFormInfo.shape).extend(zodBaseForm.shape)
export type User = z.infer<typeof zodUser>;

// 登录
export const zodAuth = z.object({
    user: zodUser,
    jwt: z.string().min(3, zod_tool.nonull()),
})
export type Auth = z.infer<typeof zodAuth>