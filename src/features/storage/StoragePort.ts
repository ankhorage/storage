import type {
  StorageListInput,
  StorageListResult,
  StorageRemoveInput,
  StorageResolveInput,
  StorageResolveResult,
  StorageResult,
  StorageUploadInput,
  StorageUploadResult,
} from '@ankhorage/contracts/storage';

/*** Define provider-neutral object-storage execution operations. */
export interface StoragePort {
  upload(input: StorageUploadInput): Promise<StorageResult<StorageUploadResult>>;
  remove(input: StorageRemoveInput): Promise<StorageResult>;
  list(input: StorageListInput): Promise<StorageResult<StorageListResult>>;
  resolve(input: StorageResolveInput): Promise<StorageResult<StorageResolveResult>>;
}
