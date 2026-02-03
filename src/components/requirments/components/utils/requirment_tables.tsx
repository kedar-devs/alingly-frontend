import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
  } from "@tanstack/react-table"
import type{ Requirement } from "../../interfaces/requirment.interface"

const columnHelper = createColumnHelper<Requirement>()

function getDefaultColumns(onVisitRequirement?: (id: string) => void): ColumnDef<Requirement, any>[] {
    return [
        columnHelper.accessor("title", {
            header: "Title",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("content", {
            header: "Content",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("version", {
            header: "Version",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("created_at", {
            header: "Created At",
            cell: (info) => info.getValue(),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <button className="text-[#5bd787] font-semibold hover:underline hover:cursor-pointer" onClick={() => onVisitRequirement?.(row.original.id)}>
                    Visit
                </button>
            ),
        })
    ]
}
type RequirementTableProps = {
    data: Requirement[],
    columns?: ColumnDef<Requirement, any>[],
    onVisitRequirement?: (id: string) => void,
}
function RequirementTable({ data, columns, onVisitRequirement }: RequirementTableProps) {
    const table = useReactTable({
        data,
        columns: columns ?? getDefaultColumns(onVisitRequirement),
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="w-full overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full min-w-[600px] border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b border-gray-200 bg-gray-50">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-3 text-sm text-gray-800">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                    No requirements to show.
                </div>
            )}
        </div>
    )
}
export default RequirementTable

