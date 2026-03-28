import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegisterUserMutation } from "../store/api/auth.api"
import { useGetAllOrganizationsQuery } from "../../organization/store/api/organization.api"
import { formValidationRules, isFormValid ,validateForm, type ValidationErrors} from "../form-validation/validation"
import { UserRole } from "../interfaces/user.interface"
import Toaster from "../../../utils/toaster/toaster"

import { useGetUploadUrlMutation } from "../../organization/store/api/organization.api"
import { organizationApi } from "../../organization/store/api/organization.api"

function Register() {
  const { mutate: registerUser, isPending } = useRegisterUserMutation()
  const {data: organizations, isLoading: isLoadingOrganizations} = useGetAllOrganizationsQuery()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [failedCount, setFailedCount] = useState<number>(0)
  const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
  const [organizationId, setOrganizationId] = useState('')
  const [role, setRole] = useState(UserRole.DEVELOPER)
  const [profilePicture, setProfilePicture] = useState<File|null>(null)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const navigate = useNavigate()
  const { mutate: getUploadUrl } = useGetUploadUrlMutation()
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm({ name, email, password }, formValidationRules.register)
    if (!isFormValid(validationErrors)) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    registerUser({ name, email, password, organization_id: organizationId, profile_picture: uploadUrl },{
      onSuccess: () => {
        navigate('')
      },
      onError: (error: any) => {
        const message=error.data?.detail || error.message || 'Failed to register user'
        setFailedCount(failedCount + 1)
        if(failedCount > 3) {
          setToaster({message: 'Failed to register user after 3 attempts', type: 'error'})
          return
        }
        setToaster({message: 'Failed to register user', type: 'error'})
        return
      }
    })
  }
  const handlePictureSelection = (file: File | undefined) => {
    if(file) {
      if(file.size > 1024 * 1024 * 5) {
        setErrors({ profilePicture: 'Profile picture must be less than 5MB' })
        return
      }
      if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/webp') {
        setErrors({ profilePicture: 'Profile picture must be a valid image' })
        return
      }
      setProfilePicture(file)
    }
  }
  const handleGetUploadUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(profilePicture) {
      getUploadUrl({
        file_name: profilePicture.name,
        content_type: profilePicture.type,
      },{
      onSuccess: async (data) => {
        try{
          const uploadedUrl=await organizationApi.uploadToS3(data, profilePicture)
          setUploadUrl(uploadedUrl)
          handleRegister(e)
        }
        catch(error: any){
          const message=error.data?.detail || error.message || 'Failed to upload profile picture'
          setErrors({ profilePicture: 'Failed to upload profile picture \n' + "Error: "+message })
          return
        }
      },
      onError: (error: any) => {
        const message=error.data?.detail || error.message || 'Failed to get upload URL'
        setErrors({ profilePicture: 'Failed to get upload URL \n' + "Error: "+message })
        return
      }
    })
    }
    else{
      handleRegister(e)
    }
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
      <div className=" w-1/3 h-2/3 border rounded-xl p-4 flex flex-col justify-center items-center gap-4 text-[#5bd787]">
        <h1 className="text-4xl font-bold">Register</h1>
        <form className="flex flex-col gap-4 w-full h-full justify-between" onSubmit={handleGetUploadUrl}>
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
          {isLoadingOrganizations && <p>Loading organizations...</p>}
          {!isLoadingOrganizations && organizations && organizations.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm">Organization</label>
              <select name="organization" className="border rounded-md p-2" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)}>
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id} className="bg-black flex flex-col justify-between gap-2">
                    {organization.name}
                    {organization.logo && <img src={organization.logo} alt="Organization Logo" className="w-10 h-10" />}
                   {organization.acronym && <p className="text-sm">  ({organization.acronym})</p>}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-sm">Role</label>
            <select name="role" className="border rounded-md p-2" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.DEVELOPER}>Developer</option>
              <option value={UserRole.REVIEWER}>Reviewer</option>
            </select>
            <label className="text-sm">Profile Picture</label>
            <input type="file" name="profilePicture" onChange={(e) => handlePictureSelection(e.target.files?.[0])} className="border rounded-md p-2" accept="image/*" />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
          </div>
          <button className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold" type="submit" disabled={isPending}>{isPending ? 'Signing up...' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  )
}

export default Register