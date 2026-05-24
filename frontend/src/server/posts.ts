export interface Post {
  id: string | number;
  imageName: string;
  caption: string;
  totalComments: number;
  totalLikes: number;
  created: string | Date;
  imageUrl?: string;
}

export async function getPosts(): Promise<Post[]> {
  // TODO: Implement getPosts from DynamoDB
  return [];
}

export async function createPost(file: { buffer: Buffer, mimetype: string }, caption: string): Promise<Post | null> {
  // TODO: Implement createPost using DynamoDB and S3
  return null;
}

export async function deletePost(id: string | number): Promise<Post | null> {
  // TODO: Implement deletePost using DynamoDB and S3
  return null;
}
