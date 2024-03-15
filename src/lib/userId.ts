import { getAuthSession } from "./auth";

export default async function UserId(){
    const session = await getAuthSession()
    const userId = session?.user.id

    if(!userId){
        throw new Error('you must be signed in to use this feature')
    }

    return userId
}