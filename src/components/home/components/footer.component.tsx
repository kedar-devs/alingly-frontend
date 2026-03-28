function FooterComponent() {
    return (
        <div className=" w-full h-[400px] flex flex-col justify-center items-center bg-white text-black p-10">
            <div className=" w-4/5 grid grid-cols-2 gap-x-10">
                <div className=" flex flex-col col-span-1 justify-center items-center">
                    <h1 className=" text-2xl font-bold text-black uppercase">Alignly</h1>
                    <p className=" text-sm text-gray-500">The enterprise-grade alignment platform for complex engineering and consulting ecosystems.</p>
                </div>
                <div className=" flex flex-col col-span-1 justify-center items-center">
                    <div className=" grid grid-cols-3 gap-x-4 ">
                        <div className=" flex flex-col col-span-1 justify-center items-center">
                            <h1 className=" text-lg font-bold text-black uppercase"> Products</h1>
                            <ul className=" flex flex-col gap-y-2">
                                <li className=" text-sm text-gray-500">Features</li>
                                <li className=" text-sm text-gray-500">Integrations</li>
                                <li className=" text-sm text-gray-500">Pricing</li>
                                <li className=" text-sm text-gray-500">Security</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent;