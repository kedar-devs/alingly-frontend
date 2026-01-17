import { useState } from "react"
import { useLoginUserMutation } from "../store/api/auth.api"
import { formValidationRules, isFormValid ,validateForm, type ValidationErrors} from "../form-validation/validation"
import { useNavigate } from "react-router-dom"
import AppPaths from "../../../routes/routes.constant"
import Toaster from "../../../utils/toaster/toaster"
function Login() {
  const { mutate: loginUser, isPending } = useLoginUserMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [failedCount, setFailedCount] = useState<number>(0)
  const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
  const navigate = useNavigate()
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm({ email, password }, formValidationRules.login)
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    loginUser({ email, password },
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
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-1/3  border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">

        <h1 className="text-4xl font-bold">Log-in</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors({ ...errors, email: '' })
                } 
              }} 
              className="border rounded-md p-2 w-full" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) {
                setErrors({ ...errors, password: '' })
              }
              }} 
              className="border rounded-md p-2 w-full" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <button type="submit" className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold" disabled={isPending} >{isPending ? 'Signing in...' : 'Sign In'}</button>
        </form>
      </div>
      <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
    </div>
  )
}

export default Login