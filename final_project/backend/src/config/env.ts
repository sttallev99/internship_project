import 'dotenv/config';

const requireEnv = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};

export const env = {
    port: Number(process.env.PORT ?? 5000),
    nodeEnv: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    dbConnectionString: requireEnv('DB_CONNECTION_STRING'),
    secretKey: requireEnv('SECRET_KEY'),
    bucket: requireEnv('BUCKET'),
    awsRegion: process.env.AWS_REGION ?? 'eu-north-1',
    clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:3000',
} as const;
