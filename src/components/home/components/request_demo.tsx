function RequestDemo() {
    return (
        <div className=" w-ful h-[450px] flex flex-col justify-center items-center bg-gray-50 ">
            <div className=" w-4/5 h-4/5 bg-[#115fd4] text-white rounded-2xl p-4 flex flex-col justify-center items-center">
                <div className=" w-1/2 flex flex-col justify-center items-center">
                    <h1 className=" text-4xl font-bold text-white font-bold">Ready to align your next project?</h1>
                    <p  className=" text-white text-sm">Join the thousands of engineers and consultants who have used Alignly to align their projects.</p>
                </div>
                <div className=" w-1/2 flex justify-center items-center gap-x-4 mt-5">
                    <button className=" bg-white text-blue-500 px-4 py-2 rounded-md cursor-pointer font-bold capitalize min-w-36 ">Book your Demo</button>
                    <button className=" text-blue-500 px-4 py-2 rounded-md cursor-pointer font-bold capitalize bg-[#115fd4] text-white border border-white">View case studies</button>
                </div>
            </div>
        </div>
    )
}

export default RequestDemo;