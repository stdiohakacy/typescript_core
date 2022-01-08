import dotenv from 'dotenv';
import { convertStringToBoolean } from '../libs/common';
import { MailProvider, StorageProvider } from './ServiceProvider';
dotenv.config();

// SYSTEM ENVIRONMENT
export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';
export const PROJECT_ID: string = process.env.PROJECT_ID ?? '';
export const PROJECT_NAME: string = process.env.PROJECT_NAME ?? '';
export const PROTOTYPE: string = process.env.PROTOTYPE ?? '';
export const DOMAIN: string = process.env.DOMAIN ?? '';

// DATABASE CONFIGURATION
export const DB_TYPE: string = process.env.DB_TYPE ?? '';
export const DB_HOST: string = process.env.DB_HOST ?? '';
export const DB_PORT: number = process.env.DB_PORT ? Number(process.env.DB_PORT) : 0;
export const DB_NAME: string = process.env.DB_NAME ?? '';
export const DB_USER: string = process.env.DB_USER ?? '';
export const DB_PASS: string = process.env.DB_PASS ?? '';

// API SERVICE
export const ENABLE_API_SERVICE: boolean = convertStringToBoolean(process.env.ENABLE_API_SERVICE);
export const API_PORT: number = Number(process.env.API_PORT);

// AUTHENTICATION SERVICE
export const AUTH_SIGNATURE: string = process.env.AUTH_SIGNATURE ?? '';
export const AUTH_SECRET_OR_PRIVATE_KEY: string = process.env.AUTH_SECRET_KEY ?? '';
export const AUTH_SECRET_OR_PUBLIC_KEY: string = process.env.AUTH_SECRET_KEY ?? '';

// MAIL SERVICE
export const MAIL_PROVIDER: number = process.env.MAIL_PROVIDER ? Number(process.env.MAIL_PROVIDER) : MailProvider.CONSOLE;

export const MAIL_SENDER_NAME: string = process.env.MAIL_SENDER_NAME ?? '';
export const MAIL_SENDER_EMAIL: string = process.env.MAIL_SENDER_EMAIL ?? '';

export const GOOGLE_SMTP_USERNAME: string = process.env.GOOGLE_SMTP_USERNAME ?? '';
export const GOOGLE_SMTP_PASSWORD: string = process.env.GOOGLE_SMTP_PASSWORD ?? '';

// LOG SERVICE
export const LOG_PROVIDER: number = Number(process.env.LOG_PROVIDER);
// export const LOG_PROVIDER: number = process.env.LOG_PROVIDER ? Number(process.env.LOG_PROVIDER) : LogProvider.WINSTON;

// STORAGE SERVICE
export const STORAGE_PROVIDER: number = process.env.STORAGE_PROVIDER ? Number(process.env.STORAGE_PROVIDER) : StorageProvider.CONSOLE;
export const STORAGE_URL: string = process.env.STORAGE_URL ?? 'http://localhost';
export const STORAGE_UPLOAD_DIR: string = process.env.STORAGE_UPLOAD_DIR ?? '';
export const BUCKET_NAME: string = process.env.BUCKET_NAME ?? '';

export const S3_REGION: string = process.env.S3_REGION ?? '';
export const S3_ACCESS_KEY: string = process.env.S3_ACCESS_KEY ?? '';
export const S3_SECRET_KEY: string = process.env.S3_SECRET_KEY ?? '';