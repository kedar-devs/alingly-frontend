import { useState } from "react"
import { useRegisterUserMutation } from "../store/api/auth.api"

function Register() {
  const { mutate: registerUser } = useRegisterUserMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }
    registerUser({ name, email, password })
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-64 border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">
        <h1 className="text-4xl font-bold">Register</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md p-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md p-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md p-2" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold" onClick={handleRegister}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register