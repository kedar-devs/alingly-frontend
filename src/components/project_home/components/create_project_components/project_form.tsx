import { useState } from "react"
import { useAuthStore } from "../../../auth/store/auth.store"
import { useCreateProjectMutation } from "../../store/api/project.api"
import { projectFormSchema } from "../../form-validation/project.form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"

import type{ ProjectFormProps } from "../../interface/project.interface"
import Toaster from "../../../../utils/toaster/toaster"

function ProjectForm({projectSaved, projectError}: ProjectFormProps) {
    const [failedCount, setFailedCount] = useState<number>(0)
    const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
    const { user } = useAuthStore()
    const { mutate: createProject, isPending } = useCreateProjectMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectFormSchema),
    })
    type ProjectFormData = z.infer<typeof projectFormSchema>
    const handleCreateProject = (data: ProjectFormData) => {
        createProject({ name: data.name, description: data.description, organization_id: user?.organization_id || '', user_id: user?.id || '' },{
            onSuccess: () => {
                projectSaved()
            },
            onError: (error) => {
                setFailedCount(prev=>prev+1)
                if(failedCount > 3) {
                    setToaster({message: 'Failed to create project after 3 attempts', type: 'error'})
                    return
                }
                setToaster({message: 'Failed to create project', type: 'error'})
                projectError(error)
            }
           
        })

    }
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-y-5">
        <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
        <h1 className="text-2xl font-bold capitalize">Create new Project</h1>
        <p className="text-sm text-gray-500">Create a new project to get started, setup your project and start collaborating with your team.</p>
        <form className="flex flex-col gap-4 w-full justify-between h-full bg-white" onSubmit={handleSubmit(handleCreateProject)}>
          <div className="flex flex-col gap-5 w-full h-full">
            <div className="flex flex-col gap-2">
              <label className="text-md capitalize font-semibold">Project Name </label>
              <input type="text" {...register("name")} placeholder="Enter project name" className="border rounded-md p-2 " required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-md capitalize font-semibold">Organization</label>
              <input type="text" placeholder="Enter Organization" className="border rounded-md p-2 bg-gray-100" required />
              {errors.organization && <p className="text-red-500 text-sm">{errors.organization.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md capitalize font-semibold">Description </label>
              <textarea {...register("description")} className="border rounded-md p-2 h-36 " required />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <button type="submit" className="bg-[#1877f2] text-white p-2 rounded-md cursor-pointer font-bold" disabled={isPending}>{isPending ? 'Creating project...' : 'Create Project'}</button>
          </div>
        </form>
        </div>
    )
}

export default ProjectForm