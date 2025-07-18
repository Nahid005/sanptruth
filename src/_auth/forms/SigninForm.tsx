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
import { SigninValidation } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useSigninAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

function SigninForm() {
    const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
    const navigate = useNavigate();

    const {mutateAsync: signInAccount, isPending: isSigninUser} = useSigninAccount();
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
          email: "",
          password: ""
        },
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SigninValidation>) {

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
            <h5 className="base-medium my-5">Sign in your account</h5>
          </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className="shad-button_primary">Sign in</Button>
        <p>Don't have an account <Link to={'/sign-up'} className="small-semibold "> {isUserLoading ? "Loading.." : "Sign up"}</Link></p>
      </form>
    </Form>
    )
}

export default SigninForm;