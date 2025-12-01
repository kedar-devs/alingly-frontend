
function HomeComponent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full text-[#5bd787] gap-4">
                <h1 className="text-6xl font-bold ">Alignly</h1>
                <p className="text-sm">Alignly is a platform for aligning your business with your customers.</p>
                <button className="bg-[#5bd787] text-black p-2 rounded-md cursor-pointer font-bold">Get Started</button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <img src="/home-logo.jpg" alt="Alignly" className="w-full h-full object-cover" />
            </div>
        </div>

    </div>
  )
}

export default HomeComponent