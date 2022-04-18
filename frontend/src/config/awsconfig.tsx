export const awsconfig = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME || "",
    dirName: "upload",
    region: process.env.REACT_APP_AWS_REGION || "",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ""
}
