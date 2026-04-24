import zod_tool from "@/tool/web/zod_tool";
import z from "zod";
import { zodBaseForm } from "./zod_entity_base";

const zodGlobalSeo = z.object({
    metaTitle: z.string().min(3, zod_tool.buildtip('不为空')),
    metaDescription: z.string().min(3, zod_tool.buildtip('不为空')),
})

export const zodGlobalForm = z.object({
    siteName: z.string().min(3, zod_tool.buildtip('不为空')),
    siteDescription: z.string().min(3, zod_tool.buildtip('不为空')),
    defaultSeo: zodGlobalSeo
})

export type GlobalForm = z.infer<typeof zodGlobalForm>

export const zodGlobal = zodGlobalForm.extend(zodGlobalForm.shape).extend(zodBaseForm.shape)
export type EntityGlobal = z.infer<typeof zodGlobal>
