import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { uploadFile, getObjectSignedUrl, deleteFile } from "./s3";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import crypto from "crypto";

export interface Post {
  id: string | number;
  imageName: string;
  caption: string;
  totalComments: number;
  totalLikes: number;
  created: string | Date;
  imageUrl?: string;
}
//creating dynamodb client
const client = new DynamoDBClient({
  region: process.env.AWS_BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

//warp it Document client, instead passing wired aws data type helps to pass JSON objects
const ddbDocClient = DynamoDBDocument.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME as string;

// Helper to generate a random string for the image file name
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function getPosts(): Promise<Post[]> {
  // TODO: Implement getPosts from DynamoDB
  return [];
}

export async function createPost(
  file: { buffer: Buffer; mimetype: string },
  caption: string,
): Promise<Post | null> {
  // TODO: Implement createPost using DynamoDB and S3
  return null;
}

export async function deletePost(id: string | number): Promise<Post | null> {
  // TODO: Implement deletePost using DynamoDB and S3
  return null;
}
