import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { formatRelativeTime } from "./../formatters/time.format";

type SuggestionCardProps = {
    id: string;
    priority: string;
    priority_css: string;
    flagged_by: string;
    date: Date;
    flag: string;
    ai_flag: string;
    ai_suggestion: string;
}
function SuggestionCard({ id, priority, priority_css, date, flag, ai_flag, ai_suggestion, flagged_by }: SuggestionCardProps) {
  return (
    <Card className="w-full border py-10 px-5">
        <CardHeader classnName="text-gray-500 font-bold text-md flex h-96 w-full p-5">
          <div className="flex gap-2">
            {id.slice(0, 8)} <span className={`ml-2 ${priority_css}`}>{priority}</span> <span> created {date.toLocaleDateString()} ago by {flagged_by} </span>
            </div>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-gray-500 font-bold text-md">Flagged Requirement</CardTitle>
            <CardDescription className="text-gray-700 text-sm flex flex-col">
              {flag}
              <div className="bg-gray-500 text-black mt-2 flex flex-col">
                <span className="text-sm font-bold">AI Risk Explaination</span>
                <span className="text-sm">{ai_flag}</span>
              </div>
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-gray-500 font-bold text-md">AI Suggestion</CardTitle>
              <CardDescription className="text-black border rounded-2xl border-dashed bg-gray-400 text-sm flex flex-col">
                {ai_suggestion}
                <div className="bg-gray-500 text-black mt-2 flex gap-x-3">
                  <Button>Apply Suggestion</Button>
                  <Button variant="outline">Edit</Button>
                </div>
              </CardDescription>
            </div>
        </CardContent>
                
    </Card>
  )
}

export default SuggestionCard
