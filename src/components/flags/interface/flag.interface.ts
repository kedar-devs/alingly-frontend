export enum FlagTypeEnum {
    All = "All",
    Medium = "Medium",
    AssignedToMe = "AssignedToMe",
    High = "High",
    Low = "Low"
}

export interface FlagType{
    type: FlagTypeEnum,
}

export interface Flag{
    id: string,
    priority: FlagTypeEnum,
    requirement_id: string,
    flagged_by: string,
    date: Date,
    flag: string,
    ai_flag: string,
    ai_suggestion: string
}

export interface FlagDetailsType{
    severity: FlagTypeEnum,
    count: number,
}
