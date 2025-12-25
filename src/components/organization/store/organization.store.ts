import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Organization {
    name: string;
}

interface OrganizationState {
    organization: Organization | null;
    setOrganization: (organization: Organization) => void;
}

export const useOrganizationStore = create<OrganizationState>()(
    persist(
        (set)=>({
            organization: null,
            setOrganization: (organization: Organization) => {
                set({ organization });
            },
        }),
        {
            name: "organization-storage",
            partialize:(state)=>({
                organization: state.organization,
            }),
        }
    )
)
