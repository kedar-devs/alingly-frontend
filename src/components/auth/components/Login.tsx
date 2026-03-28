import { useState } from "react"
import { useLoginUserMutation } from "../store/api/auth.api"
import { EyeIcon } from "lucide-react"
import { EyeOffIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaArrowRight } from "react-icons/fa";
import { loginSchema } from "../form-validation/validation";
import { useNavigate } from "react-router-dom"
import { RiStackLine } from "react-icons/ri";

import AppPaths from "../../../routes/routes.constant"
import Toaster from "../../../utils/toaster/toaster"
function Login() {
  const { mutate: loginUser, isPending } = useLoginUserMutation()
  const [failedCount, setFailedCount] = useState<number>(0)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
  const navigate = useNavigate()
  type LoginFormData = z.infer<typeof loginSchema>
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const handleLogin = (data: LoginFormData) => {
    loginUser(data,
      {
        onSuccess: () => {
          navigate(AppPaths.PROJECT_HOME)
        },
        onError: (error) => {
          setFailedCount(failedCount + 1)
          if(failedCount > 3) {
            setToaster({message: 'Failed to login after 3 attempts', type: 'error'})
            return
          }
          setToaster({message: 'Failed to login', type: 'error'})
        }
      }
    )
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 gap-y-10">
      <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
      <h1 className="text-4xl font-bold uppercase flex gap-x-2"> <RiStackLine className="w-10 h-10 text-[#1877f2]" /> Alignly</h1>
      <div className=" w-96  border rounded-md py-10 px-5 flex flex-col items-center gap-y-10 text-black bg-white shadow">
        <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-500">Enter your credentials to access your workspace</p>
        </div>
        <button className=" border rounded-md p-2 w-full"> Sign in with Single Sign-On (SSO)</button>
        <div className=" flex justify-between items-center w-full">
        <div className=" h-[1px] w-1/3 bg-gray-200" />
        <p className="text-sm text-gray-500">or</p>
        <div className=" h-[1px] w-1/3 bg-gray-200" />
        </div>
        <form className="flex flex-col gap-10 w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Work Email</label>
            <input
             {...register('email')}
             type="email"
             placeholder="name@organization.com"
              className="border rounded-md p-2 w-full bg-gray-50  inset-shadow-sm" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm flex justify-between items-center font-bold">Password <span className="text-sm cursor-pointer text-[#1877f2] font-normal hover:underline cursor-pointer">forgot password?</span></label>
            <div className="relative">
              <input type={showPassword?"password":"text"} {...register('password')}
              className="border rounded-md p-2 w-full bg-gray-50  inset-shadow-sm" 
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
              </button>
            </div>
            
            {errors.password && <p className="text-red-500 text-sm">{errors.password?.message}</p>}
          </div>
          
          <button type="submit" className="bg-[#1877f2] text-white p-2 rounded-md cursor-pointer font-bold flex items-center justify-center gap-2" disabled={isPending} >{isPending ? 'Signing in...' : 'Sign In'} <FaArrowRight className="w-4 h-4" /> </button>
        </form>
      </div>
      <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
    </div>
  )
}

export default Login