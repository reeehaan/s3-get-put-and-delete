import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
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
const ddbDocClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME as string;

// Helper to generate a random string for the image file name
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export async function getPosts(): Promise<Post[]> {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    //ask dynamodb for the data
    const data = await ddbDocClient.send(new ScanCommand(params));

    //Typecast returned it for what are they
    const posts = (data.Items as Post[]) || [];

    //Sort the posts by date (newest first)
    // (DynamoDB 'Scan' returns data in random order, so we sort it here)
    posts.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );

    for (const post of posts) {
      post.imageUrl = await getObjectSignedUrl(post.imageName);
    }
    return posts;
  } catch (err) {
    console.error("Error getting posts from DynamoDB:", err);
    return [];
  }
}

export async function createPost(
  file: { buffer: Buffer; mimetype: string },
  caption: string,
): Promise<Post | null> {
  const imageName = generateFileName();

  //resize and compress image using sharp
  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();

  //upload image to s3
  await uploadFile(fileBuffer, imageName, file.mimetype);

  //create post obj into dynamoDB
  const post: Post = {
    id: uuidv4(),
    imageName: imageName,
    caption: caption,
    totalComments: 0,
    totalLikes: 0,
    created: new Date().toString(),
  };

  // save post obj into dynamoDB
  const params = {
    TableName: TABLE_NAME,
    Item: post,
  };
  await ddbDocClient.send(new PutCommand(params));

  //grab sec url right now so frontend ca display it immediately
  post.imageUrl = await getObjectSignedUrl(imageName);

  return post;
}

export async function deletePost(id: string | number): Promise<Post | null> {
  // 1. First, we need to get the post from DynamoDB so we know what the `imageName` is.
  // (We can't delete the image from S3 if we don't know its name!)
  const getParams = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  const data = await ddbDocClient.send(new GetCommand(getParams));
  const post = data.Item as Post | undefined;

  if (!post) {
    return null;
  }
  //delete actual image file from s3 bucket
  await deleteFile(post.imageName);

  //delete metadata from dynamodb table
  const deleteParams = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  await ddbDocClient.send(new DeleteCommand(deleteParams));
  return post;
}
