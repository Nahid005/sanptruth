import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const client = new Client();

export const appWriteConrig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    productId: import.meta.env.VITE_APPWRITE_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    mediaId: import.meta.env.VITE_APPWRITE_MEDIA_ID,
    saveCollectionId: import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
}

client.setEndpoint(appWriteConrig.url);
client.setProject(appWriteConrig.productId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);