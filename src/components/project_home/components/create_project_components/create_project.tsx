import { useState } from "react"
import { useAuthStore } from "../../../auth/store/auth.store"
import { useNavigate } from "react-router-dom"

import Toaster from "../../../../utils/toaster/toaster"
import { RiStackLine } from "react-icons/ri"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import ProjectForm from "./project_form"
import TeamForm from "./team_form"
import Intigration from "./intigration"

function CreateProject() {
    const [failedCount, setFailedCount] = useState<number>(0)
    const [toaster, setToaster] = useState<{message: string, type: 'success' | 'error' | 'custom'}>({message: '', type: 'success'})
    const [activeTab, setActiveTab] = useState<"project" | "teams" | "integrations">('project')
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const handleTabChange = (value: "project" | "teams" | "integrations") => {
        setActiveTab(value)
    }

      
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4 bg-gray-50">
      <Toaster message={toaster.message} type={toaster.type} count={failedCount} />
      <h1 className="text-4xl font-bold uppercase flex gap-x-2"> <RiStackLine className="w-10 h-10 text-[#1877f2]" /> Alignly</h1>
      <div className=" w-2/4 min-h-4/5 max-h-4/5 border rounded-md p-10 flex flex-col items-center gap-4 text-black bg-white gap-y-5 shadow-lg">
        <Tabs defaultValue="project" value={activeTab} onValueChange={(value) => handleTabChange(value as "project" | "teams" | "integrations")}>
          <TabsList variant="line" className=" w-full">
            <TabsTrigger value="project">Details</TabsTrigger>
            <TabsTrigger value="teams"> Teams</TabsTrigger>
            <TabsTrigger value="intergrations"> Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="project" className=" w-full h-full p-10">
            <ProjectForm projectSaved={() => {}} projectError={() => {}} user={user} />
          </TabsContent>
          <TabsContent value="teams">
            <TeamForm />
          </TabsContent>
          <TabsContent value="intergrations">
              <Intigration />
          </TabsContent>
        </Tabs>      
        </div>
    </div>
  )
}

export default CreateProject