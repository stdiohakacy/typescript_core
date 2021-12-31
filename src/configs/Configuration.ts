import dotenv from 'dotenv';
import { convertStringToBoolean } from '../libs/common';
dotenv.config();

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