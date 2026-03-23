import type { Flag } from "../interface/flag.interface"
import { FlagTypeEnum } from "../interface/flag.interface"
export const FlagMockData: Flag[] = [
    {
        id: '1234567890',
        priority: FlagTypeEnum.High,
        requirement_id: 'req-001',
        flagged_by: 'Alice',
        date: new Date(),
        flag: "The requirement is too vague and does not specify the expected behavior of the system.",
        ai_flag: "The requirement is ambiguous and lacks specific details about the expected behavior, which may lead to misunderstandings during development.",
        ai_suggestion: "Consider revising the requirement to include specific details about the expected behavior, such as input/output examples, edge cases, and any constraints that should be considered during implementation."
    },
    {
        id: '0987654321',
        priority: FlagTypeEnum.Medium,
        requirement_id: 'req-001',
        flagged_by: 'Bob',
        date: new Date(),
        flag: 'The requirement does not specify performance requirements, which may lead to issues during scalability.',
        ai_flag: 'The requirement lacks performance criteria,   which may result in scalability issues as the system grows.',
        ai_suggestion: 'Consider adding performance requirements to ensure the system can handle expected loads and scale effectively.'
    },
    {
        id: '1122334455',
        priority: FlagTypeEnum.Low,
        requirement_id: 'req-001',
        flagged_by: 'Charlie',
        date: new Date(),
        flag: 'The requirement is missing user interface details, which may lead to a suboptimal user experience.',
        ai_flag: 'The requirement does not include user interface specifications, which may result in a less intuitive and user-friendly design.',
        ai_suggestion: 'Consider including user interface details in the requirement to enhance the overall user experience and ensure the design meets user needs.'
    },
    {
        id: '5566778899',
        priority: FlagTypeEnum.High,
        requirement_id: 'req-001',
        flagged_by: 'David',
        date: new Date(),
        flag: 'The requirement does not specify security requirements, which may lead to vulnerabilities in the system.',
        ai_flag: 'The requirement lacks security specifications, which may expose the system to potential vulnerabilities and threats.',
        ai_suggestion: 'Consider adding security requirements to ensure the system is protected against potential threats and vulnerabilities.'
    }
]  