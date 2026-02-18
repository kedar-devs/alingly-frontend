import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRequirementVersionsQuery, useGetRequirmentByVersionQuery } from "../store/api/requirment.api";

function RequirementVersion() {

    const { requirementId } = useParams<{ requirementId: string }>();

    const [viewingVersion, setViewingVersion] = useState<number | null>(null);
    const [isComparing, setIsComparing] = useState<boolean>(false);
    const [compareA, setCompareA] = useState<number | "">("");
    const [compareB, setCompareB] = useState<number | "">("");
    const { data: versions } = useGetRequirementVersionsQuery(requirementId || "");
    const { data: versionSnapshot } = useGetRequirmentByVersionQuery(
        requirementId || "",
        viewingVersion ?? 1,
        viewingVersion !== null
    );

    return (
        <div className="w-full h-full flex flex-col items-start justify-start gap-y-10">

            <div className="w-full h-full grid grid-cols-4 gap-4">

            </div>

        </div>
    )
}
export default RequirementVersion