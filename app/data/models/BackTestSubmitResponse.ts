/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BackTestSubmitResponse
 */
export interface BackTestSubmitResponse {
    /**
     * 
     * @type {string}
     * @memberof BackTestSubmitResponse
     */
    ident?: string;
}

export function BackTestSubmitResponseFromJSON(json: any): BackTestSubmitResponse {
    return BackTestSubmitResponseFromJSONTyped(json, false);
}

export function BackTestSubmitResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BackTestSubmitResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ident': !exists(json, 'ident') ? undefined : json['ident'],
    };
}

export function BackTestSubmitResponseToJSON(value?: BackTestSubmitResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ident': value.ident,
    };
}


