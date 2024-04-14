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
import {
    BotOrderType,
    BotOrderTypeFromJSON,
    BotOrderTypeFromJSONTyped,
    BotOrderTypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface BackTestRequest
 */
export interface BackTestRequest {
    /**
     * 
     * @type {boolean}
     * @memberof BackTestRequest
     */
    enableCloseMode: boolean;
    /**
     * 
     * @type {number}
     * @memberof BackTestRequest
     */
    preFetchBar: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRequest
     */
    makerFee: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRequest
     */
    takerFee: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRequest
     */
    initBalance: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRequest
     */
    numberWorker: number;
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    botPath?: string;
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    botName?: string;
    /**
     * 
     * @type {BotOrderType}
     * @memberof BackTestRequest
     */
    botOrderType?: BotOrderType;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof BackTestRequest
     */
    indicatorParam?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    starDateStr?: string;
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    endDateStr?: string;
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    coin?: string;
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    mainInterval?: string;
    /**
     * 
     * @type {string}
     * @memberof BackTestRequest
     */
    exchange?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof BackTestRequest
     */
    otherIntervals?: Array<string>;
}

export function BackTestRequestFromJSON(json: any): BackTestRequest {
    return BackTestRequestFromJSONTyped(json, false);
}

export function BackTestRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BackTestRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enableCloseMode': json['enableCloseMode'],
        'preFetchBar': json['preFetchBar'],
        'makerFee': json['makerFee'],
        'takerFee': json['takerFee'],
        'initBalance': json['initBalance'],
        'numberWorker': json['numberWorker'],
        'botPath': !exists(json, 'botPath') ? undefined : json['botPath'],
        'botName': !exists(json, 'botName') ? undefined : json['botName'],
        'botOrderType': !exists(json, 'botOrderType') ? undefined : BotOrderTypeFromJSON(json['botOrderType']),
        'indicatorParam': !exists(json, 'indicatorParam') ? undefined : json['indicatorParam'],
        'starDateStr': !exists(json, 'starDateStr') ? undefined : json['starDateStr'],
        'endDateStr': !exists(json, 'endDateStr') ? undefined : json['endDateStr'],
        'coin': !exists(json, 'coin') ? undefined : json['coin'],
        'mainInterval': !exists(json, 'mainInterval') ? undefined : json['mainInterval'],
        'exchange': !exists(json, 'exchange') ? undefined : json['exchange'],
        'otherIntervals': !exists(json, 'otherIntervals') ? undefined : json['otherIntervals'],
    };
}

export function BackTestRequestToJSON(value?: BackTestRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enableCloseMode': value.enableCloseMode,
        'preFetchBar': value.preFetchBar,
        'makerFee': value.makerFee,
        'takerFee': value.takerFee,
        'initBalance': value.initBalance,
        'numberWorker': value.numberWorker,
        'botPath': value.botPath,
        'botName': value.botName,
        'botOrderType': BotOrderTypeToJSON(value.botOrderType),
        'indicatorParam': value.indicatorParam,
        'starDateStr': value.starDateStr,
        'endDateStr': value.endDateStr,
        'coin': value.coin,
        'mainInterval': value.mainInterval,
        'exchange': value.exchange,
        'otherIntervals': value.otherIntervals,
    };
}


