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
 * @interface StreakDto
 */
export interface StreakDto {
    /**
     * 
     * @type {string}
     * @memberof StreakDto
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof StreakDto
     */
    count: number;
    /**
     * 
     * @type {number}
     * @memberof StreakDto
     */
    pnl: number;
}

export function StreakDtoFromJSON(json: any): StreakDto {
    return StreakDtoFromJSONTyped(json, false);
}

export function StreakDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): StreakDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'count': json['count'],
        'pnl': json['pnl'],
    };
}

export function StreakDtoToJSON(value?: StreakDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'count': value.count,
        'pnl': value.pnl,
    };
}


