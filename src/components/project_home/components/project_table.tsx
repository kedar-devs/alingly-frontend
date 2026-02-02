import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import type { Project } from "../interface/project.interface"

const columnHelper = createColumnHelper<Project>()

function getDefaultColumns(onVisitProject?: (id: string) => void): ColumnDef<Project, any>[] {
  return [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => {
        const desc = (info.getValue() as string) ?? ""
        const display = desc.length > 60 ? `${desc.slice(0, 60)}...` : desc || "—"
        return (
          <span className="cursor-help" title={desc || undefined}>
            {display}
          </span>
        )
      },
    }),
    columnHelper.accessor("created_at", {
      header: "Created",
      cell: (info) => {
        const val = info.getValue() as string
        if (!val) return "—"
        try {
          return new Date(val).toLocaleDateString()
        } catch {
          return val
        }
      },
    }),
    columnHelper.accessor("updated_at", {
      header: "Updated",
      cell: (info) => {
        const val = info.getValue() as string
        if (!val) return "—"
        try {
          return new Date(val).toLocaleDateString()
        } catch {
          return val
        }
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          type="button"
          className="text-[#5bd787] font-semibold hover:underline hover:cursor-pointer"
          onClick={() => onVisitProject?.(row.original.id)}
        >
          Visit
        </button>
      ),
    }),
  ]
}

type ProjectTableProps = {
  data: Project[]
  columns?: ColumnDef<Project, any>[]
  onVisitProject?: (id: string) => void
}

function ProjectTable({ data, columns, onVisitProject }: ProjectTableProps) {
  const table = useReactTable({
    data,
    columns: columns ?? getDefaultColumns(onVisitProject),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full overflow-x-auto rounded-md border border-gray-200">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200 bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
            >
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
          No projects to show.
        </div>
      )}
    </div>
  )
}

export default ProjectTable
