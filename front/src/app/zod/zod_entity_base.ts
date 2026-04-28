import z from "zod";

export const zodBaseForm = z.object({
    id: z.string(),  
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    delFlag: z.number().nullable()
})

export type BaseEntity = z.infer<typeof zodBaseForm>;

