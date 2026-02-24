import * as zod from "zod";

export const registerSchema = zod.object({
    name: zod.string().min(2).max(100),
    username: zod.string().min(3).max(50),
    email: zod.email(),
    password: zod.string().min(8),
    role: zod.enum(["USER", "ADMIN", "MANAGER"]).default('USER')
})