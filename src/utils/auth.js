import { ID } from "appwrite";
import { account } from "../services/appwrite";

export async function getUser() {
    return await account.get()
}

export async function createUser(email, password, name) {
    return await account.create(ID.unique(), email, password, name);
}

export async function loginUser(emailId, password) {
    return await account.createEmailPasswordSession(emailId, password);
}