import MainContentComponent from "./main_content.component"
import TrustedByContent from "./trusted_by_content"
import WorkingComponent from "./working.component"
import RequestDemo from "./request_demo"
import FooterComponent from "./footer.component"
import { HeadbarComponent } from "@/utils/navbar/headbar.component"
import { useGetHomeDataQuery } from "../store/api/home.api"

function HomeComponent() {
  
  return (
    <div className="flex w-full min-h-screen flex-col">
      <HeadbarComponent />
      <div className=" flex flex-col w-full min-h-screen">
        <MainContentComponent />
        <TrustedByContent />
        <WorkingComponent />
        <RequestDemo />
        <FooterComponent />
      </div>
    </div>
  )
}

export default HomeComponent