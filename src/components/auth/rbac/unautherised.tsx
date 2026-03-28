import { MdOutlineSecurity } from "react-icons/md";
import { RiStackLine } from "react-icons/ri";
import AppPaths from "@/routes/routes.constant";
import { useNavigate } from "react-router-dom";

function Unautherised() {
    const navigate = useNavigate();
    return (
        <div className=" w-full h-screen flex flex-col justify-center items-center bg-gray-50 gap-y-10">
            <h1 className="text-4xl font-bold uppercase flex gap-x-2"> <RiStackLine className="w-10 h-10 text-[#1877f2]" /> Alignly</h1>
            <div className=" w-2/3 h-1/2 border rounded-md  bg-white flex flex-col items-center justify-between p-10">
            <div className="flex h-1/3 flex-col gap-y-4 items-center justify-center">
            <span className=" w-1/3 aspect-square flex flex-col items-center justify-center rounded-full bg-gray-50 border ">
                <MdOutlineSecurity className="w-10 h-10 text-[#1877f2]" />
                </span>
                <p className=" w-fit h-fit text-center px-5 py-2 bg-gray-50 rounded-md border font-semibold ">
                    Error Code 403
                </p>
            </div>
            <div className=" flex h-1/3 flex-col items-center justify-center gap-y-4">    
            <h1 className=" text-4xl font-bold capitalize text-center">
                Access Denied
            </h1>
            <p className=" text-center text-gray-500 w-2/3">
                You are not authorized to access this page. Please contact the administrator or return to the Dashboard.
            </p>
            </div>
            <div className=" flex justify-center items-center gap-x-4 h-1/3">
                <button className="text-white cursor-pointer bg-[#1877f2] px-4 py-2 rounded-md h-fit" onClick={() => navigate(AppPaths.HOME)}>
                    Return to Dashboard
                </button>
                <button className=" border text-black cursor-pointer px-4 py-2 rounded-md h-fit" onClick={()=>{console.log('contact support')}}>
                    Contact Support
                </button>
            </div>
            </div>
            
        </div>
    )
}

export default Unautherised;