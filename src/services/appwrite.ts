import { Client, Account, Databases } from 'appwrite';

const p = process.env;

const client = new Client()
  .setEndpoint(p.EXPO_PUBLIC_APPWRITE_APIENDPOINT)
  .setProject(p.EXPO_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection IDs
export const DATABASE_ID = p.EXPO_PUBLIC_APPWRITE_DATABASE;
export const POSTS_COLLECTION_ID = p.EXPO_PUBLIC_APPWRITE_BLOG_COLLECTION;
export const USERS_COLLECTION_ID = p.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION;

// Storage bucket ID
export const BUCKET_ID = 'avatars';

export const appwriteConfig = {
  endpoint: p.EXPO_PUBLIC_APPWRITE_APIENDPOINT,
  projectId: p.EXPO_PUBLIC_APPWRITE_PROJECT,
  databaseId: DATABASE_ID,
  postsCollectionId: POSTS_COLLECTION_ID,
  usersCollectionId: USERS_COLLECTION_ID
};
