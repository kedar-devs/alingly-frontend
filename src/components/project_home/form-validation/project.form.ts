import { z } from "zod"

export const projectFormSchema = z.object({
    name: z.string().min(1,"Name is requirement"),
    organization: z.string().min(1,"Organization is requirement"),
    description: z.string().min(1,"Description is requirement"),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>