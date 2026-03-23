import InfoCard from "@/utils/cards/info_card"
import { FlagTypeEnum } from "../interface/flag.interface"
import FlagContents from "./flag_contents"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function FlagCenter() {
  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full grid grid-cols-4 ">
      <div className=" col-span-3 w-full h-full px-10 py-5 flex flex-col">
        <h1 className=" text-5xl text-black">
          Flag Center
        </h1>
        <p className=" text-md text-gray-400">
          Review and resolve {} active Misalignment across your project requirements
        </p>
        <div className="w-full flex gap-x-3">
          <InfoCard title="Unassigned" titleCss="capitalize" info={4} infoCss="text-red-500" />
          <InfoCard title="In Progress" titleCss="capitalize" info={4} infoCss="text-yellow-500" />
          <InfoCard title="Resolved" titleCss="capitalize" info={4} infoCss="text-green-500" />
        </div>
        <div className=" w-full h-full overflow-scroll mt-5">
          <Tabs defaultValue="all_flags">
            <TabsList variant="line">
              <TabsTrigger value="all_flags">All Flags</TabsTrigger>
              <TabsTrigger value="high_priority">High Priority</TabsTrigger>
              <TabsTrigger value="assigned_me">Assigned to Me</TabsTrigger>
            </TabsList>
            <TabsContent value="all_flags" className="w-full h-full overflow-y-scroll">
              <FlagContents type={FlagTypeEnum.All} />
            </TabsContent>
            <TabsContent value="high_priority" className="w-full h-full">
              <FlagContents type={FlagTypeEnum.High} />
            </TabsContent>
            <TabsContent value="assigned_me" className="w-full h-full">
              <FlagContents type={FlagTypeEnum.AssignedToMe} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className=" col-span-1 w-full h-full">

      </div>
      </div>
      
    </div>
  )
}

export default FlagCenter