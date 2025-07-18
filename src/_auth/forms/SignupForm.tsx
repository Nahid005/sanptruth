import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useCreateUserAccount, useSigninAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

function SignupForm() {
    const {checkAuthUser, isPending: isUserLoading} = useUserContext();
    const navigate = useNavigate();


    const {mutateAsync: createUserAccount, isPending: isCreateUser} = useCreateUserAccount();

    const {mutateAsync: signInAccount, isPending: isSigninUser} = useSigninAccount();
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
          name: "",
          username: "",
          email: "",
          password: ""
        },
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        const newUser = await createUserAccount(values);
        
        if(!newUser) {
          return toast("Sign up faild please try again");
        }

        const session = await signInAccount({
          email: values.email,
          password: values.password
        })

        if(!session) {
          return toast("Sign in faild please try again");
        }

        const isLoggedIn = await checkAuthUser();

        if(isLoggedIn) {
          form.reset();

          navigate('/')
        }else {
          toast("Login failed. Please try again.");
        }
    }

    return (
        <Form {...form}>
          <div className="flex justify-center flex-col items-center">
            <img className="w-32 h-32" src="./assets/logo.png" alt="snaptruth-logo" />
            <h5 className="base-medium my-5">If you use snaptruth please create an account</h5>
          </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="User Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="shad-input" type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="shad-input" type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">Sign up</Button>
        <p>You have already an account please <Link to={'/sign-in'} className="small-semibold "> {isCreateUser ? "Loading.." : "Sign in"}</Link></p>
      </form>
    </Form>
    )
}

export default SignupForm;