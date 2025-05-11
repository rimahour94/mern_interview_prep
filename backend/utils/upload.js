import multer from "multer";
import multers3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import { config } from "dotenv";

// .env configure
config();
// AWS access
// eslint-disable-next-line no-undef
const awsAccessKeyId = process.env.ACCESS_KEY;
// eslint-disable-next-line no-undef
const awsSecretKey = process.env.AWS_SECRET_KEY;
// eslint-disable-next-line no-undef
const region = process.env.REGION;
// eslint-disable-next-line no-undef
const bucket_name = process.env.BUCKET_NAME;

export const AWSAccess = () => {
  const s3 = new AWS.S3({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretKey,
    region: region,
  });

  console.log(s3, "S3");

  return s3;
};

export const upload = multer({
  storage: multers3({
    s3: AWSAccess(),
    bucket: bucket_name,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf(".")
      );
      cb(null, `${uuidv4()}${ext}`);
    },
  }),
});
