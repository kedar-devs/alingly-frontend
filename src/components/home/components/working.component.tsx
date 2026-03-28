function WorkingComponent() {
    return (
        <div className=" w-ful h-[350px] flex flex-col justify-center items-center bg-gray-50 ">
            <h1 className=" text-3xl font-bold text-black uppercase">How it works</h1>
            <div className=" w-full h-full flex justify-between items-center gap-x-16">
                <div className=" bg-white rounded-2xl p-4  w-64 border gap-y-3 ">
                    <div className=" w-12 h-12 rounded-md bg-blue-500">

                    </div>
                    <h1 className=" text-lg font-bold text-black capitalize">1. Capture</h1>
                    <p className=" text-sm text-gray-500 mt-2 leading-relaxed">
                        Consolidate disparate requirements from stakeholders in one central, version-controlled location
                    </p>
                </div>
                <div className=" bg-white rounded-2xl p-4  w-64 border gap-y-3 ">
                    <div className=" w-12 h-12 rounded-md bg-blue-500">

                    </div>
                    <h1 className=" text-lg font-bold text-black capitalize">2. Align</h1>
                    <p className=" text-sm text-gray-500 mt-2 leading-relaxed">
                        Resolve conflicts via automated workflows and real-time collaboration tools designed for complexity.
                    </p>
                </div>
                <div className=" bg-white rounded-2xl p-4  w-64 border gap-y-3 ">
                    <div className=" w-12 h-12 rounded-md bg-blue-500">

                    </div>
                    <h1 className=" text-lg font-bold text-black capitalize">3. Approve</h1>
                    <p className=" text-sm text-gray-500 mt-2 leading-relaxed">
                    Secure formal sign-off with an immutable audit trail and industry-standard version control
                    </p>
                </div>

            </div>
        </div>
    )
}
export default WorkingComponent;