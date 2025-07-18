import {useMutation} from "@tanstack/react-query";
import { createAccount, signInAccount } from "../appwrite/api";
import type { INewUser } from "@/types";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createAccount(user)
    })
}

export const useSigninAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user)
    })
}