import type { TrustedCardType } from "../interface/home.interface";
function TrustedCard({ trustedCard }: { trustedCard: TrustedCardType }) {
    return (
        <div className=" w-64 h-36 border rounded-2xl border-gray-300 flex flex-col justify-center items-center">
            <h1 className=" text-lg ">
                Trusted by
            </h1>
            <img className=" w-1/2 h-1/2 object-cover rounded-2xl " src={trustedCard.image?? "/home-logo.jpg"} alt="Trusted by" />
            <p className=" text-sm font-bold">
                {trustedCard.name}
            </p>
        </div>
    )
}
export default TrustedCard;