import dotenv from 'dotenv';
import { convertStringToBoolean } from '../libs/common';
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