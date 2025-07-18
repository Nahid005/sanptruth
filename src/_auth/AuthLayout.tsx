import { Home } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    const isAuthenticated = false;

    return (
        <>
            {
                isAuthenticated ? <Home /> : 
                (
                    <> 
                        <section className="flex flex-1 justify-center items-center flex-col py-10">{<Outlet />}</section>

                        <img src="/assets/side-img.svg" alt="" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
                    </>
                )
            }
        </>
    )
}

export default AuthLayout;