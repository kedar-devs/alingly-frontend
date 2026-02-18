import { useState } from "react";
import {
    useGetRequirementVersionsQuery,
    useGetRequirmentByVersionQuery,
    useRestoreRequirementVersionMutation,
} from "../store/api/requirment.api";
import type { Requirement, RequirementVersionMeta } from "../interfaces/requirment.interface";


type RequirementVersionProps = {
    requirementId: string;
    currentRequirement?: Requirement | null;
    onViewVersion?: (version: number | null) => void;
    viewingVersion?: number | null;
};

function RequirementVersion({
    requirementId,
    currentRequirement,
    onViewVersion,
    viewingVersion = null,
}: RequirementVersionProps) {
    const [compareMode, setCompareMode] = useState(false);
    const [compareA, setCompareA] = useState<number | "">("");
    const [compareB, setCompareB] = useState<number | "">("");

    const { data: versions = [], isLoading: versionsLoading } = useGetRequirementVersionsQuery(requirementId);
    const restoreMutation = useRestoreRequirementVersionMutation();

    const currentVersionNumber = currentRequirement
        ? parseInt(currentRequirement.version, 10) || 1
        : null;

    const handleRestore = (version: number) => {
        if (!window.confirm("Restore to this version? This will create a new version with this content.")) return;
        restoreMutation.mutate(
            { requirementId, version },
            {
                onSuccess: () => {
                    onViewVersion?.(null);
                },
            }
        );
    };

    if (versionsLoading) {
        return <div className="text-sm text-gray-500 p-2">Loading versions...</div>;
    }

    if (versions.length === 0) {
        return <div className="text-sm text-gray-500 p-2">No version history.</div>;
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Version history</h2>
                <button
                    type="button"
                    onClick={() => setCompareMode(!compareMode)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {compareMode ? "Cancel compare" : "Compare versions"}
                </button>
            </div>

            {compareMode ? (
                <CompareVersions
                    requirementId={requirementId}
                    versions={versions}
                    compareA={compareA}
                    compareB={compareB}
                    setCompareA={setCompareA}
                    setCompareB={setCompareB}
                />
            ) : (
                <ul className="list-none p-0 m-0 flex flex-col gap-2 max-h-64 overflow-y-auto">
                    {versions.map((v: RequirementVersionMeta) => {
                        const isCurrent = currentVersionNumber !== null && v.version === currentVersionNumber;
                        const isViewing = viewingVersion !== null && viewingVersion === v.version;
                        return (
                            <li
                                key={v.version}
                                className="flex items-center justify-between gap-2 py-2 px-3 rounded border border-gray-200 bg-white text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">v{v.version}</span>
                                    {isCurrent && (
                                        <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                                            Current
                                        </span>
                                    )}
                                    {isViewing && !isCurrent && (
                                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                            Viewing
                                        </span>
                                    )}
                                    <span className="text-gray-500">
                                        {new Date(v.updated_at).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => onViewVersion?.(v.version)}
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        View
                                    </button>
                                    {!isCurrent && (
                                        <button
                                            type="button"
                                            onClick={() => handleRestore(v.version)}
                                            disabled={restoreMutation.isPending}
                                            className="text-amber-600 hover:underline text-xs disabled:opacity-50"
                                        >
                                            Restore
                                        </button>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

type CompareVersionsProps = {
    requirementId: string;
    versions: RequirementVersionMeta[];
    compareA: number | "";
    compareB: number | "";
    setCompareA: (v: number | "") => void;
    setCompareB: (v: number | "") => void;
};

function CompareVersions({
    requirementId,
    versions,
    compareA,
    compareB,
    setCompareA,
    setCompareB,
}: CompareVersionsProps) {
    const { data: versionA } = useGetRequirmentByVersionQuery(
        requirementId,
        compareA !== "" ? compareA : 1,
        compareA !== ""
    );
    const { data: versionB } = useGetRequirmentByVersionQuery(
        requirementId,
        compareB !== "" ? compareB : 1,
        compareB !== ""
    );

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Version A</label>
                    <select
                        value={compareA === "" ? "" : compareA}
                        onChange={(e) => setCompareA(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                    >
                        <option value="">Select</option>
                        {versions.map((v) => (
                            <option key={v.version} value={v.version}>
                                v{v.version} – {new Date(v.updated_at).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Version B</label>
                    <select
                        value={compareB === "" ? "" : compareB}
                        onChange={(e) => setCompareB(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                    >
                        <option value="">Select</option>
                        {versions.map((v) => (
                            <option key={v.version} value={v.version}>
                                v{v.version} – {new Date(v.updated_at).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-3">
                <div className="rounded border border-gray-200 p-3 bg-gray-50 min-h-[120px]">
                    <div className="text-xs font-semibold text-gray-500 mb-2">
                        {compareA !== "" ? `Version ${compareA}` : "—"}
                    </div>
                    {versionA ? (
                        <>
                            <div className="font-medium text-gray-800 mb-1">{versionA.title}</div>
                            <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">
                                {versionA.content}
                            </pre>
                        </>
                    ) : (
                        <span className="text-gray-400 text-sm">Select a version</span>
                    )}
                </div>
                <div className="rounded border border-gray-200 p-3 bg-gray-50 min-h-[120px]">
                    <div className="text-xs font-semibold text-gray-500 mb-2">
                        {compareB !== "" ? `Version ${compareB}` : "—"}
                    </div>
                    {versionB ? (
                        <>
                            <div className="font-medium text-gray-800 mb-1">{versionB.title}</div>
                            <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">
                                {versionB.content}
                            </pre>
                        </>
                    ) : (
                        <span className="text-gray-400 text-sm">Select a version</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RequirementVersion;
