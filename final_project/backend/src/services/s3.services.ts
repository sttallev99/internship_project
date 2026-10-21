import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

import { env } from '../config/env.js';

const s3 = new S3Client({ region: env.awsRegion });

/** Uploads a property image and returns its public URL. */
export const uploadImageToS3 = async (file: Express.Multer.File): Promise<string> => {
    const key = `propertyImages/${uuid()}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: env.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }),
    );

    return `https://${env.bucket}.s3.${env.awsRegion}.amazonaws.com/${key}`;
};
