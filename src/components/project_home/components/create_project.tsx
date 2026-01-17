import { useState } from "react"
import { useAuthStore } from "../../auth/store/auth.store"
import { useCreateProjectMutation } from "../store/api/project.api"
import { validateForm, type ValidationErrors, formValidationRules, isFormValid } from "../../auth/form-validation/validation"
import { useNavigate } from "react-router-dom"
import AppPaths from "../../../routes/routes.constant"
import Toaster from "../../../utils/toaster/toaster"

function CreateProject() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [failedCount, setFailedCount] = useState<number>(0)
    const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const { mutate: createProject, isPending } = useCreateProjectMutation()
    if(!user) {
      return <div className="flex items-center justify-center w-full h-full">You are not logged in</div>
  }
    const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validationErrors = validateForm({ name, description }, formValidationRules.createProject)
        if (!isFormValid(validationErrors)) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
       console.log(user)
        createProject({ name, description, organization_id: user.organization_id, user_id: user.id },{
            onSuccess: () => {
                navigate(AppPaths.PROJECT_HOME)
            },
            onError: (error) => {
                setFailedCount(prev=>prev+1)
                if(failedCount > 3) {
                    setToaster({message: 'Failed to create project after 3 attempts', type: 'error'})
                    return
                }
                setToaster({message: 'Failed to create project', type: 'error'})
            }
        })

    }

      
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-1/3 border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">
        <h1 className="text-4xl font-bold">Create Project</h1>
        <form className="flex flex-col gap-4 w-full justify-between h-full" onSubmit={handleCreateProject}>
          <div className="flex flex-col gap-5 w-full h-full">
            <div className="flex flex-col gap-2">
              <label className="text-lg">Name :</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md p-2 " />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg">Description :</label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-md p-2 " />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <button type="submit" className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold">Create Project</button>
            <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject