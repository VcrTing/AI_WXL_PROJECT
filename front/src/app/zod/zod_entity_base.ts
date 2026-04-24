import z from "zod";



export const zodBaseForm = z.object({
    id: z.string()
    // id: z.number().nullable(),
    // documentId: z.string().nullable()
})

export type BaseEntity = z.infer<typeof zodBaseForm>;

