import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(3, {message: "name is too short enter min 3 char"}).max(25, {message: "name is too long enter max 25 char"}),
    username: z.string().min(3, {message: "username is too short enter min 3 char"}).max(15, {message: "username is too long enter max 15 char"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "password must be 8 char"})
})