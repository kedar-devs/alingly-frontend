function MainContentComponent() {
    return (
        <div className=" h-3/4 w-full grid grid-cols-2 bg-gray-50">
            <div className=" col-span-1 h-full flex flex-col justify-center items-center">
                <div className="flex flex-col w-2/3 gap-y-2">
                <span className=" bg-blue-500/10 text-blue-500 uppercase text-sm rounded-full px-5 py-2 w-fit">
                    enterprise version
                </span>
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                                Requirement Alignment for High-Stakes Projects
                </h1>
                <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed max-w-[540px]">
                                Prevent misunderstandings and eliminate rework. The enterprise platform for consultants and engineers to stay perfectly synced.
                </p>
                <div className="flex gap-x-2 mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer font-bold">
                        Book a Demo
                    </button>
                    <button className=" border text-black border-black px-4 py-2 rounded-md cursor-pointer font-bold">
                        Get Started
                    </button>
                </div>
                </div>
            </div>
            <div className=" col-span-1 w-full h-full flex justify-center items-center">
                <img src="/home-logo.jpg" alt="Alignly" className="w-1/2 h-1/2 object-cover rounded-2xl " />
            </div>
        </div>
    )
}
export default MainContentComponent;