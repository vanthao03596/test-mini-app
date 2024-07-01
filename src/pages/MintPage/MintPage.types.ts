import { User } from "@/types/public.types";

export type LastClaimResponse = {
    last_claim: Date | null;
};

export type UserResponse = {
    user: User
};
