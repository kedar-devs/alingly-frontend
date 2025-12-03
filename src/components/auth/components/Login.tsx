import { useState } from "react"
import { useLoginUserMutation } from "../store/api/auth.api"
function Login() {
  const { mutate: loginUser } = useLoginUserMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    loginUser({ email, password })
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-64 border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">

        <h1 className="text-4xl font-bold">Log-in</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md p-2" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md p-2" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold" onClick={handleLogin}>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Login