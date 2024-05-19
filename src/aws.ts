import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  accessKeyId: "fc8296728781f8bf44916216b2fe4f71",
  secretAccessKey: "d44cef15d6ca7a091ecad99bf9b7a9b17ec2428d8770784b243c0eb8d1812bb4",
  endpoint: "https://81575b281e66967f423e14f66e4d01c7.r2.cloudflarestorage.com",
});

export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Bucket: "vercel",
      Key: fileName,
    })
    .promise();
  console.log(response);
};
