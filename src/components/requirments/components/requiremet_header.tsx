function RequiremetHeader({ title, content, sideButtons }: { title: string, content: string, sideButtons: React.ReactNode }) {
  return (
    <div className="w-full h-36 flex flex-row justify-between border-0 border-b-2 border-gray-300">
        <div className=" px-10 py-5 flex flex-col gap-x-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500 word-wrap">{content || ""}</p>
        </div>
        <div className="px-10 py-5 flex flex-row items-center justify-end gap-x-3">
            {sideButtons || null}
        </div>
    </div>
  )
}

export default RequiremetHeader