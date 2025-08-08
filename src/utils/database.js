import { DATABASE_ID, USERS_COLLECTION_ID } from "../services/appwrite";

export async function createUser(userId, username) {
    return await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        ID.unique(),
        {
            userId,
            username,
            joinedAt: new Date(),
        }
    );
}