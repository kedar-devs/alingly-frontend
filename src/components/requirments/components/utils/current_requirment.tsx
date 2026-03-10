import { useState } from "react";
import {
    useGetActivityForRequirementQuery,
    useGetRequirementByIdQuery,
    useGetRequirmentByVersionQuery,
} from "../../store/api/requirment.api";
import BasicEditor from "../../../../utils/text-editor/basic_editor";
import type { Comment } from "../../interfaces/requirment.interface";
import { textToJSONContent } from "@/utils/text-editor/text.helper";


type CurrentProjectProps = {
    currentRequirementId: string;
};

function CurrentRequirment({ currentRequirementId }: CurrentProjectProps) {
    const [newComment, setNewComment] = useState<string>("");
    const [viewingVersion, setViewingVersion] = useState<number | null>(null);

    const { data: requirement } = useGetRequirementByIdQuery(currentRequirementId || "");
    const { data: versionSnapshot } = useGetRequirmentByVersionQuery(
        currentRequirementId || "",
        viewingVersion ?? 1,
        viewingVersion !== null
    );
    const { data: activity } = useGetActivityForRequirementQuery(currentRequirementId || "", 5);

    const displayRequirement = viewingVersion !== null ? versionSnapshot : requirement;

    return (
        <div className="w-full h-full grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col items-start justify-start gap-2">
                {viewingVersion !== null && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                            Viewing version {viewingVersion}
                        </span>
                        <button
                            type="button"
                            onClick={() => setViewingVersion(null)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Back to current
                        </button>
                    </div>
                )}
                <h1 className="text-2xl font-bold">{displayRequirement?.title}</h1>
                <div className="w-full h-full bg-white">
                    <BasicEditor content={displayRequirement?.content || textToJSONContent("")} />
                </div>
            </div>
        <div className="col-span-1 flex flex-col gap-4">
            {/* <div className="bg-white rounded-md border border-gray-200 p-4">
                <RequirementVersion
                    requirementId={currentRequirementId}
                    currentRequirement={requirement ?? null}
                    onViewVersion={setViewingVersion}
                    viewingVersion={viewingVersion}
                />
            </div> */}
            <div className="bg-gray-200 rounded-md p-4 gap-4">
            <div className="flex flex-col items-center justify-start gap-2 border-0 border-b-2 border-gray-300">
            <h1 className="text-2xl font-bold">Ambiguity Detection</h1>
            <p className="text-sm text-gray-500 word-wrap">This is a project that is used to detect ambiguity in the project.</p>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-36">Analyze</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md w-36">Request Approval</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md w-36">Flag Misalignment</button>

            <div className="flex flex-col items-center justify-start gap-2 mt-5 border-0 border-t-2 border-gray-50">
                <div className="flex flex-col items-center justify-start gap-2 h-96 overflow-y-auto">
                <h1 className="text-2xl font-bold">Activity</h1>
                <div className="flex flex-col gap-4 max-h-80 overflow-scroll ">
                {activity?.map((activity:Comment) => (
                    <div key={activity.id} className=" rounded-md p-2 text-sm flex flex-col">
                        <div className="flex flex-row justify-between font-bold">
                            {activity.author.name}
                        </div>
                        <p className="bg-white p-2 rounded-md min-h-14"> {activity.content}</p>
                    </div>

                ))}
                </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View All</button>
                <div className="flex flex-col items-center justify-start gap-2">
                <input type="text" placeholder="Add a comment" className="w-full h-full p-2 rounded-md border border-gray-200 bg-white " value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Comment</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default CurrentRequirment