from dotenv import load_dotenv
load_dotenv('.env')
import os
import boto3

aws_bucket_name = os.environ.get('AWS_BUCKET_NAME')
aws_bucket_region = os.environ.get('AWS_BUCKET_REGION')
aws_access_key = os.environ.get('AWS_ACCESS_KEY')
aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')

# S3 client
session = boto3.Session(
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_bucket_region
)

S3 = session.client('s3')

def list_s3_objects(bucket_name = aws_bucket_name):
    # Call S3 to list current objects
    response = S3.list_objects_v2(Bucket=bucket_name)
    objects = response.get('Contents', [])
    # for obj in objects:
    #     print(f"Key: {obj['Key']}, Size: {obj['Size']}")
    return objects

def get_a_s3_object(object_name, bucket_name = aws_bucket_name):
    # Call S3 to get the object
    response = S3.get_object(Bucket=bucket_name, Key=object_name)
    # print(response['Body'].read())
    return response['Body'].read()
