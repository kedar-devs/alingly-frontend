import { useState,useRef } from "react"
import { useCreateOrganizationMutation, useGetUploadUrlMutation, organizationApi } from "../store/api/organization.api"
import type { ValidationErrors } from "../../auth/form-validation/validation"
import { validateForm, formValidationRules } from "../../auth/form-validation/validation"
import { CiImageOn } from "react-icons/ci"
import Toaster from "../../../utils/toaster/toaster"

function createOrganization() {
  const { mutate: createOrganization, isPending } = useCreateOrganizationMutation()
  const { mutate: getUploadUrl, isPending: isGetUploadUrlPending } = useGetUploadUrlMutation()
  const [name, setName] = useState('')
  const [acronym, setAcronym] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [failedCount, setFailedCount] = useState<number>(0)
  const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleLogoChange = (file: File | undefined) => {
    if (file) {
      if(file.size > 1024 * 1024 * 5) {
        setErrors({ logo: 'Logo must be less than 5MB' })
        return
      }
      if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/webp') {
        setErrors({ logo: 'Logo must be a valid image' })
        return
      }
      if(file.size > 1024 * 1024 * 5) {
        setErrors({ logo: 'Logo must be less than 5MB' })
        return
      }
      setLogo(file)
    }
  }

  const handleGetUploadUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(logo) {
    getUploadUrl({
      file_name: logo?.name || '',
      content_type: logo?.type || '',
      file_size: logo?.size || 0,
    },{
      onSuccess: async (data) => {
        try{
        const uploadedUrl=await organizationApi.uploadToS3(data, logo)
        console.log(uploadedUrl)
        setUploadUrl(uploadedUrl)
        setFailedCount(1)
        setToaster({message: 'Upload URL generated successfully', type: 'success'})
        setFailedCount(0)
        handleCreateOrganization(e)
        }
        catch(error: any){
          const message=error.data?.detail || error.message || 'Failed to generate upload URL'
          setToaster({message: 'Failed to generate upload URL \n' + "Error: "+message, type: 'error'})
          setFailedCount(failedCount + 1)
          if(failedCount > 3) {
            setToaster({message: 'Failed to generate upload URL after 3 attempts \n' + "Error: "+message, type: 'error'})
            return
          }
          return
        }
        },
        onError: (error: any) => {
          const message=error.data?.detail || error.message || 'Failed to generate upload URL'
          setToaster({message: 'Failed to generate upload URL \n' + "Error: "+message, type: 'error'})
          setFailedCount(failedCount + 1)
          if(failedCount > 3) {
            setToaster({message: 'Failed to generate upload URL after 3 attempts \n' + "Error: "+message, type: 'error'})
            return
          }
          return
        }
      })
    }
    else{
      handleCreateOrganization(e)
    }
  }

  const handleCreateOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm({ name }, formValidationRules.createOrganization)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('acronym', acronym)
    if(logo) {
      formData.append('logo', uploadUrl)
    }
    createOrganization(formData,{
      onSuccess: () => {
        setToaster({message: 'Organization created successfully', type: 'success'})
      },
      onError: (error: any) => {
        setFailedCount(failedCount + 1)
        if(failedCount > 3) {
          setToaster({message: 'Failed to create organization after 3 attempts', type: 'error'})
          return
        }
        // The API error type may not have 'data', so check if it's available.
        const errorMessage =
          error?.response?.data?.detail ||
          error?.data?.detail ||
          error?.message ||
          'An error occurred while creating the organization';
        setToaster({ message: errorMessage, type: 'error' });
      }
      })

  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" w-1/3 h-2/3 border rounded-md p-4 flex flex-col items-center gap-4 text-[#5bd787]">
        <h1 className="text-4xl font-bold">Create Organization</h1>
        <form className="flex flex-col gap-4 w-full justify-between h-full" onSubmit={handleGetUploadUrl}>
          <div className="flex flex-col gap-5 w-full h-full">
            <div className="flex flex-col gap-2 h-1/6">
            <label className="text-lg">Name :</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md p-2 " />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2 h-1/6">
            <label className="text-lg">Acronym :</label>
            <input type="text" name="acronym" value={acronym} onChange={(e) => setAcronym(e.target.value)} className="border rounded-md p-2" />
            {errors.acronym && <p className="text-red-500 text-sm">{errors.acronym}</p>}
            </div>
            <div className="flex flex-col gap-2 h-3/6">
            <label className="text-lg">Logo :</label>
            <div className="flex flex-col gap-2 justify-center items-center w-full h-full border rounded-md">
            {logo?<div className="w-full h-full gap-2 flex flex-col">
              <img src={URL.createObjectURL(logo)} alt="Logo" className="w-full h-2/3 object-cover cursor-pointer" onClick={() => logoInputRef.current?.click()} />
              <button onClick={()=>setLogo(null)} className=" text-white bg-red-500  rounded-md cursor-pointer font-bold w-full">Remove</button>
              </div>:<div className="flex flex-col gap-2 justify-center items-center w-full h-full cursor-pointer" onClick={() => logoInputRef.current?.click()}>
                <input type="file" accept="image/*" name="logo" onChange={(e) => handleLogoChange(e.target.files?.[0])} className="border rounded-md p-2 hidden" ref={logoInputRef} />
                <p className="text-md">Upload Logo</p>
                <CiImageOn className="text-2xl w-12 h-12"/>
                </div>
            }
            </div>
          </div>
          <button type="submit" className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold" disabled={isPending}>{isPending ? 'Creating organization...' : 'Create Organization'}</button>
          </div>
        </form>
      </div>
      <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
    </div>
  )
}

export default createOrganization