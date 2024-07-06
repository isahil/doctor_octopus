import "dotenv/config";
import fs from "fs";
import path from "path";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const {
  AWS_BUCKET_NAME: bucketName,
  AWS_BUCKET_REGION: region,
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_ACCESS_KEY: secretAccessKeyId,
} = process.env;

const S3_Client = new S3Client({
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKeyId,
  },
  region: region,
});

export async function list_objects() {
  console.log(`bucket name ::: ${bucketName} - region ::: ${region} ::: ${accessKeyId} ::: ${secretAccessKeyId}`)
  const params = {
    Bucket: 'doctor-octopus',
    Prefix: "test_reports/"
  };

  const command = new ListObjectsCommand(params);
  const response = await S3_Client.send(command);
  console.log(`List S3 response ::: ${JSON.stringify(response.Contents)}`);

  return response;
}

export async function get_object(imageName) {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new GetObjectCommand(params);
  const response = await S3_Client.send(command);
  console.log(`Get S3 response ::: ${JSON.stringify(response)}`);
  return response;
}

export async function upload_file(bucket_name, key, file_content) {
  const params = {
    Bucket: bucket_name,
    Key: key,
    Body: file_content
  };

  const command = new PutObjectCommand(params);
  return await S3_Client.send(command);
}

export const upload_directory = async (bucket_name, directory_path) => {
  console.log(`Uploading directory ::: '${directory_path}' to S3 bucket ::: ${bucket_name}`);
  const files = fs.readdirSync(directory_path);

  for (const file of files) {
    const file_path = path.join(directory_path, file);
    const file_content = fs.readFileSync(file_path);
    const key = path.join(directory_path, file);
    await upload_file(bucket_name, key, file_content);
  }
}
