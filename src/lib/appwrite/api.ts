import type { INewUser } from "@/types";
import { account, appWriteConrig, avatars, database } from "./appwrite";
import { ID, Query } from "appwrite";


export async function createAccount(user: INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.name,
            user.password
        )

        if(!newAccount) throw Error;

        const avatarsUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            acountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: newAccount.username,
            imageUrl: avatarsUrl
        });

        return newAccount;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function saveUserToDB(user: {
    acountId: string;
    email: string;
    name: string;
    imageUrl: string;
    username?: string
}) {
    try {
        const newUser = await database.createDocument(
            appWriteConrig.databaseId,
            appWriteConrig.userCollectionId,
            ID.unique(),
            user,
        )
    } catch(error) {
        console.log(error);

        return error;
    }
}

export async function signInAccount(user: {
    email: string,
    password: string
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password)
        
        console.log("session", session)

        return session;
    } catch (error) {
        console.log(error);

        return error;
    }
}

export async function getCurrentUser () {
    try {
        const currentAccount = await account.get();

        console.log("current Account",currentAccount)
        
        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            appWriteConrig.databaseId,
            appWriteConrig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error)
    }
}