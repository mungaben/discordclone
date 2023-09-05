import { Member, Server ,Profile} from "@prisma/client"





export type TserverWithMembersWithProfiles= Server & {
    members: (Member & {Profile:Profile})[]

}