/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_upload_image_post } from '../models/Body_upload_image_upload_image_post';
import type { File } from '../models/File';
import type { ImageTypeEnum } from '../models/ImageTypeEnum';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileService {

    /**
     * Upload Image
     * @param caption 
     * @param filename 
     * @param imageTypeEnum 
     * @param formData 
     * @returns File Successful Response
     * @throws ApiError
     */
    public static uploadImageUploadImagePost(
caption: string,
filename: string,
imageTypeEnum: ImageTypeEnum,
formData: Body_upload_image_upload_image_post,
): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload/image',
            query: {
                'caption': caption,
                'filename': filename,
                'image_type_enum': imageTypeEnum,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get File
     * @param fileId 
     * @returns File Successful Response
     * @throws ApiError
     */
    public static getFileUploadFileIdGet(
fileId: number,
): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/upload/{file_id}',
            path: {
                'file_id': fileId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
