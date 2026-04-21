import { useState } from "react"
import type { TeamMember } from "../../interface/project.interface"
function TeamForm() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-y-5 p-10">
            <h1 className=" text-2xl font-bold capitalize">Team Members</h1>
            <p className="text-sm text-gray-500">Add team members to your project to get started, setup your project and start collaborating with your team.</p>
            <form className="flex flex-col gap-4 w-full justify-between h-full bg-white">
            <div className="flex flex-col gap-2">
                <label className="text-md capitalize font-semibold">Existing organization Users</label>
                <select name="existingUsers" id="existingUsers" className="border rounded-md p-2">
                    <option value="all">All</option>
                </select>
                <label className="text-md capitalize font-semibold">Invite new users</label>
                <input type="email" name="newUsers" id="newUsers" className="border rounded-md p-2" placeholder="Enter email addresses" />
            </div>
            <div className="flex flex-col gap-2 bg-gray-50 h-1/2">
                {teamMembers.map((member) => (
                    <div key={member.email} className="flex items-center justify-between gap-2 bg-white">
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                ))}
            </div>
            </form>

        </div>
    )
}

export default TeamForm