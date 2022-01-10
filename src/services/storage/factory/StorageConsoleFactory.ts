import { Readable } from "stream";
import { IBucketItem } from "../IBucketItem";
import { IStorageProvider } from "../IStorageProvider";

export class StorageConsoleFactory implements IStorageProvider {
    getBuckets(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getBucketPolicy(_bucketName: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    checkBucketExist(_bucketName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createBucket(_bucketName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setBucketPolicy(_bucketName: string, _policy: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteBucket(_bucketName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteBucketPolicy(_bucketName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getObjects(_bucketName: string): Promise<IBucketItem[]>;
    getObjects(_bucketName: string, prefix?: string): Promise<IBucketItem[]>;
    getObjects(_bucketName: any, _prefix?: any): Promise<IBucketItem[]> {
        throw new Error("Method not implemented.");
    }
    mapUrl(_bucketName: string, _urlPath: string): string {
        throw new Error("Method not implemented.");
    }
    upload(_bucketName: string, objectName: string, filePath: string): Promise<boolean>;
    upload(_bucketName: string, objectName: string, filePath: string, mimetype: string): Promise<boolean>;
    upload(_bucketName: string, objectName: string, stream: Readable): Promise<boolean>;
    upload(_bucketName: string, objectName: string, stream: Readable, mimetype: string): Promise<boolean>;
    upload(_bucketName: string, objectName: string, buffer: Buffer): Promise<boolean>;
    upload(_bucketName: string, objectName: string, buffer: Buffer, mimetype: string): Promise<boolean>;
    upload(_bucketName: any, _objectName: any, _buffer: any, _mimetype?: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    download(_bucketName: string, _objectName: string): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
    delete(_bucketName: string, _objectName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    // private readonly _logService = Container.get<ILogService>('log.service');

    // async getBuckets(): Promise<string[]> {
    //     this._logService.info('StorageService.getBuckets');
    //     return [];
    // }

    // async getBucketPolicy(bucketName: string): Promise<string> {
    //     this._logService.info('StorageService.getBucketPolicy', bucketName);
    //     return '';
    // }

    // async checkBucketExist(bucketName: string): Promise<boolean> {
    //     this._logService.info('StorageService.checkBucketExist', bucketName);
    //     return true;
    // }

    // async createBucket(bucketName: string): Promise<void> {
    //     this._logService.info('StorageService.createBucket', bucketName);
    // }

    // async setBucketPolicy(bucketName: string, policy: string): Promise<void> {
    //     this._logService.info('StorageService.setBucketPolicy', { bucketName, policy });
    // }

    // async deleteBucket(bucketName: string): Promise<void> {
    //     this._logService.info('StorageService.deleteBucket', bucketName);
    // }

    // async deleteBucketPolicy(bucketName: string): Promise<void> {
    //     this._logService.info('StorageService.deleteBucketPolicy', bucketName);
    // }

    // async getObjects(bucketName: string, prefix?: string): Promise<IBucketItem[]> {
    //     this._logService.info('StorageService.getObjects', { bucketName, prefix });
    //     return [];
    // }

    // mapUrl(bucketName: string, urlPath: string): string {
    //     return `${STORAGE_URL}/${bucketName}/${urlPath}`;
    // }
    
    // async upload(bucketName: string, objectName: string, _stream: string | Readable | Buffer, mimetype?: string): Promise<boolean> {
    //     this._logService.info('StorageService.upload', { bucketName, objectName, mimetype });
    //     return true;
    // }

    // async download(bucketName: string, objectName: string): Promise<Buffer> {
    //     this._logService.info('StorageService.download', { bucketName, objectName });
    //     return Promise.resolve(Buffer.from('Logging'));
    // }

    // async delete(bucketName: string, objectName: string): Promise<boolean> {
    //     this._logService.info('StorageService.delete', { bucketName, objectName });
    //     return true;
    // }
}