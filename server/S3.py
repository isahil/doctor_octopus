import os
from dotenv import load_dotenv
load_dotenv('.env')
import boto3

aws_bucket_name = os.environ.get('AWS_BUCKET_NAME')
aws_bucket_region = os.environ.get('AWS_BUCKET_REGION')
aws_access_key = os.environ.get('AWS_ACCESS_KEY')
aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
reports_dir = os.environ.get('REPORTS_DIR')

# Create an S3 client
session = boto3.Session(
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_bucket_region
)
S3 = session.client('s3')

def list_s3_objects(bucket_name):
    # Call S3 to list current objects
    response = S3.list_objects_v2(Bucket=bucket_name)
    
    # Get a list of objects in the bucket
    objects = response.get('Contents', [])
    for obj in objects:
        print(f"Key: {obj['Key']}, Size: {obj['Size']}")
    return objects

def download_s3_object(bucket_name):
    objects = list_s3_objects(bucket_name)
    print(f"Downloading {len(objects)} objects from {bucket_name}...")
    for obj in objects:
        object_name = obj["Key"]
        # print(f"Downloading {object_name}...")
        folder_name = object_name.split("/")[-2]
        if not os.path.exists(os.path.join(reports_dir, folder_name)):
            os.makedirs(os.path.join(reports_dir, folder_name))
        file_name = object_name.split("/")[-1]
        file_path = os.path.join(reports_dir, f"{folder_name}/{file_name}")
        
        S3.download_file(bucket_name, object_name, file_path)
        print(f"Downloaded {object_name} to ::: \n{file_path}")

# download_s3_object(aws_bucket_name)
# list_s3_objects(aws_bucket_name)