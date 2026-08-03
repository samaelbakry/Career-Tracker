import * as zod from "zod"

export const registerSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters").trim(),
    email: zod.email({error:"Please enter a valid email address"}),
    password: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
    rePassword: zod.string().nonempty("rePassword is required"),
    role :zod.enum(["job_seeker" , "employer"])
}).refine( (data) => data.rePassword === data.password , { path: ["rePassword"] , error : "Password confirmation does not match"})

export type registerSchemaType = zod.infer<typeof registerSchema>


export const loginSchema = zod.object({
    email: zod.email({error:"Please enter a valid email address"}),
    password: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
})

export type loginSchemaType = zod.infer<typeof loginSchema>



// forget password

export const forgetPassSchema = zod.object({
    email: zod.email({error:"Please enter a valid email address"}),
})

export type forgetPassSchemaType = zod.infer<typeof forgetPassSchema>



//reset password
export const resetPassSchema = zod.object({
    email: zod.email({error:"Please enter a valid email address"}),
    newPassword: zod.string().nonempty("password is required").min(3, "password must be at least 3 characters").max(20, "password must be at most 20 characters"),
})

export type resetPassSchemaType = zod.infer<typeof resetPassSchema>
