import { useState } from "react"
import type { TeamMember } from "../../interface/project.interface"
import { UserRole } from "@/components/auth/interfaces/user.interface"
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import toast,{ Toaster } from "react-hot-toast"
function TeamForm() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [newEmail, setNewEmail] = useState<string>('')
    const handleInvite = (email: string) => {
        if (email.trim() === '') {
            toast.error('Please enter a valid email address')
            return
        }
        if (teamMembers.some((member) => member.email === email)) {
            toast.error('User already exists')
            return
        }
        if (!email.includes('@')) {
            toast.error('Please enter a valid email address')
            return
        }
        setTeamMembers([...teamMembers, {email, role: UserRole.VIEWER}])
    }
    const handleDelete = (email: string) => {
        setTeamMembers(teamMembers.filter((member) => member.email !== email))
    }
    const handleRoleUpdate = (email: string, role: UserRole) => {
        setTeamMembers(teamMembers.map((member) => member.email === email ? {...member, role} : member))
    }
    const handleUpdate = (email: string) => {
        console.log(email)
    }
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-y-5 p-10">
            <Toaster />
            <h1 className=" text-2xl font-bold capitalize">Team Members</h1>
            <p className="text-sm text-gray-500">Add team members to your project to get started, setup your project and start collaborating with your team.</p>
            <form className="flex flex-col gap-4 w-full justify-between h-full bg-white">
            <div className="flex flex-col gap-2">
                <label className="text-md capitalize font-semibold">Existing organization Users</label>
                <select name="existingUsers" id="existingUsers" className="border rounded-md p-2">
                    <option value="all">All</option>
                </select>
                <label className="text-md capitalize font-semibold">Invite new users</label>
                <div className="w-full flex border rounded-md">
                <input type="email" name="newUsers" id="newUsers" className="border rounded-s-md w-5/6 p-2" placeholder="Enter email addresses" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <button type="submit" className="bg-[#1877f2] text-white p-2 rounded-e-md cursor-pointer font-bold w-1/6" onClick={(e) => {e.preventDefault(); handleInvite(newEmail)}}>Invite</button>
                </div>
            </div>
            {teamMembers.length > 0 && <div className="flex flex-col gap-2 bg-gray-50 h-1/2">
                
                    <div className=" w-full flex items-center justify-between gap-2 bg-white">
                        <p className="w-2/4 text-sm text-gray-500">Email</p>
                        <p className="w-1/4 text-sm text-gray-500">Role</p>
                        <p className="w-1/4 flex justify-end text-sm text-gray-500">Actions</p>
                    </div>
                
            </div>}
            <div className="flex flex-col gap-y-3 h-1/2">
                {teamMembers.map((member) => (
                    <div key={member.email} className=" w-full flex items-center justify-between gap-2 bg-white">
                        <p className="w-2/4 text-sm text-gray-500 overflow-x-auto">{member.email}</p>
                        <select name="role" id="role" className="w-1/4 border rounded-md p-2" value={member.role} onChange={(e) => handleRoleUpdate(member.email, e.target.value as UserRole)}>
                            <option value={UserRole.VIEWER}>Viewer</option>
                            <option value={UserRole.DEVELOPER}>Developer</option>
                            <option value={UserRole.REVIEWER}>Reviewer</option>
                            <option value={UserRole.ADMIN}>Admin</option>
                            <option value={UserRole.CONSULTANT}>Consultant</option>
                            <option value={UserRole.ALL}>All</option>
                        </select>
                        <div className="w-1/4 flex items-center justify-end gap-2">
                            <RxUpdate className="w-5 h-5 text-green-500 cursor-pointer" onClick={() => handleUpdate(member.email)} />
                            <MdDelete className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleDelete(member.email)} />
                        </div>
                    </div>
                ))}
            </div>
            </form>

        </div>
    )
}

export default TeamForm