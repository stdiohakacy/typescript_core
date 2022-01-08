import { S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY } from './../../configs/Configuration';
import { Readable } from "stream";
import { Service } from "typedi";
import { BUCKET_NAME, STORAGE_PROVIDER } from "../../configs/Configuration";
import { StorageProvider } from "../../configs/ServiceProvider";
import { AwsS3Factory } from "./factory/AwsS3Factory";
import { StorageConsoleFactory } from "./factory/StorageConsoleFactory";
import { IStorageProvider } from "./IStorageProvider";
import { IStorageService } from "./IStoreService";

@Service('storage.service')
export class StorageService implements IStorageService {
    private readonly _provider: IStorageProvider;

    constructor() {
        switch(STORAGE_PROVIDER) {
            case StorageProvider.CONSOLE:
            case StorageProvider.AWS_S3:
                this._provider = new AwsS3Factory(S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY);
                break;
            default:
                this._provider = new StorageConsoleFactory();
                break;
        }
    }
    checkBucketExist(bucketName: string): Promise<boolean> {
        return this._provider.checkBucketExist(bucketName);
    }

    async createBucket(policy: string): Promise<void> {
        const isExist = await this._provider.checkBucketExist(BUCKET_NAME);
        if(!isExist) {
            await this._provider.createBucket(BUCKET_NAME);
            await this._provider.setBucketPolicy(BUCKET_NAME, policy);
        }
    }

    mapUrl(urlPath: string): string {
        return this._provider.mapUrl(BUCKET_NAME, urlPath);
    }

    async upload(urlPath: string, stream: string | Readable | Buffer, mimetype?: string): Promise<boolean> {
        return await this._provider.upload(BUCKET_NAME, urlPath, stream as any, mimetype as any);
    }

    download(urlPath: string): Promise<Buffer> {
        return this._provider.download(BUCKET_NAME, urlPath);
    }

    delete(urlPath: string): Promise<boolean> {
        return this._provider.delete(BUCKET_NAME, urlPath);
    }
}