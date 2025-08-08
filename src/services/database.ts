import { ID } from "appwrite";
import { BlogPost } from "../types";
import {  DATABASE_ID,databases,POSTS_COLLECTION_ID } from "./appwrite";


export async function listBlogPosts() {
  return await databases.listDocuments<BlogPost>(DATABASE_ID, POSTS_COLLECTION_ID)
}

export async function createBlogPost(title, body, tags, authorId, authorName, createdAt, updatedAt) {
  return await databases.createDocument<BlogPost>(
    DATABASE_ID,
    POSTS_COLLECTION_ID,
    ID.unique(),
    {
      title,
      body,
      tags,
      authorId,
      authorName,
      createdAt,
      updatedAt
    }
  )

}