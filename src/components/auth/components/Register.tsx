import { useState } from "react"
import { useRegisterUserMutation } from "../store/api/auth.api"
import { formValidationRules, isFormValid ,validateForm, type ValidationErrors} from "../form-validation/validation"

function Register() {
  const { mutate: registerUser, isPending } = useRegisterUserMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm({ name, email, password }, formValidationRules.register)
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    registerUser({ name, email, password })
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-64 border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">
        <h1 className="text-4xl font-bold">Register</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)
              if (errors.name) {
                setErrors({ ...errors, name: '' })
              }
            }} className="border rounded-md p-2" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) {
                setErrors({ ...errors, email: '' })
              }
            }} className="border rounded-md p-2" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) {
                setErrors({ ...errors, password: '' })
              }
            }} className="border rounded-md p-2" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold" type="submit" disabled={isPending}>{isPending ? 'Signing up...' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  )
}

export default Register