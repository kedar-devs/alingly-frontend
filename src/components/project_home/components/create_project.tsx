import { useState } from "react"
import { validateForm, type ValidationErrors, formValidationRules, isFormValid } from "../../auth/form-validation/validation"

function CreateProject() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<ValidationErrors>({})

    const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validationErrors = validateForm({ name, description }, formValidationRules.createProject)
        if (!isFormValid(validationErrors)) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
    }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-1/3 h-2/3 border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">
        <h1 className="text-4xl font-bold">Create Project</h1>
        <form className="flex flex-col gap-4 w-full justify-between h-full" onSubmit={handleCreateProject}>
          <div className="flex flex-col gap-5 w-full h-full">
            <div className="flex flex-col gap-2 h-1/6">
              <label className="text-lg">Name :</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md p-2 " />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2 h-1/6">
              <label className="text-lg">Description :</label>
              <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-md p-2 " />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <button type="submit" className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject