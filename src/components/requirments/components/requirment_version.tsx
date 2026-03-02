import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRequirementVersionsQuery, useGetRequirmentByVersionQuery } from "../store/api/requirment.api";
import BasicEditor from "@/utils/text-editor/basic_editor";

function RequirementVersion() {

    const { requirementId } = useParams<{ requirementId: string }>();
    const [isComparing, setIsComparing] = useState<boolean>(false);
    const [compareA, setCompareA] = useState<number | "">("");
    const [compareB, setCompareB] = useState<number | "">("");
    const { data: versions,isLoading: isVersionLoading } = useGetRequirementVersionsQuery(requirementId || "");
    const { data: versionSnapshotA, isLoading: isVersionALoading } = useGetRequirmentByVersionQuery(
        requirementId || "",
        compareA,
        compareA !== ""
    );
     const { data: versionSnapshotB, isLoading: isVersionBLoading } = useGetRequirmentByVersionQuery(
        requirementId || "",
        compareB,
        compareB !== ""
    );
    const handleVersionComparer=(id:number)=>{
        if(id==compareA){
            setCompareA("")
        }
        if(id==compareB){
            setCompareB("")
        }
        else if(compareA===""){
            setCompareA(id)
        }
        else if(compareB===""){
            setCompareB(id)
        }

    }
    const handleCompare=()=>{
        setIsComparing(!isComparing)
    }

    if(isVersionLoading){
        return <div className="w-full h-full flex justify-center items-center">
            Version getting loaded
        </div>
    }
    return (
        <div className="w-full h-full flex flex-col items-start justify-start gap-y-10">
            <div className="w-full h-full grid grid-cols-5 gap-4">
                <div className="col-span-1 flex flex-col gap-y-4 w-full h-full overflow border border-black">
                    {versions && versions.map((version)=>{
                        return(
                            <div className="w-full h-64" onClick={()=>{handleVersionComparer(version.version)}}>
                                <h1 className="font-bold text-2xl">Version {version.version}</h1>
                                <span>Last Updated At:{version.updated_at} </span>
                                <span>Last Updated By:{version.updated_by}</span>
                            </div>
                        )
                    })}
                </div>
                <div className=" col-span-4 w-full h-full">
                    <div className="w-full flex justify-center">
                        <button className="bg-gray-300 text-black h-12" onClick={()=>{handleCompare()}}>Compare</button>
                    </div>
                    <div className="w-full h-full grid grid-cols-4">
                    <div className="col-span-2 flex flex-col w-full h-full border">
                        {isVersionALoading?<></>:<BasicEditor content={versionSnapshotA?.content} />}
                    </div>
                    <div className=" col-span-2 flex flex-col w-full h-full border">
                        {isVersionBLoading?<></>:<BasicEditor content={versionSnapshotB?.content} />}
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default RequirementVersion