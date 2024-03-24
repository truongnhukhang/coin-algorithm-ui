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
 * @interface BackTestRun
 */
export interface BackTestRun {
    /**
     * 
     * @type {boolean}
     * @memberof BackTestRun
     */
    done: boolean;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    position: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    pnl: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    fee: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    total: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    numLoose: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    numWin: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    drawDownVal: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    drawDownPer: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    winStreak: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    loseStreak: number;
    /**
     * 
     * @type {number}
     * @memberof BackTestRun
     */
    len: number;
    /**
     * 
     * @type {string}
     * @memberof BackTestRun
     */
    ident?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof BackTestRun
     */
    config?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof BackTestRun
     */
    path?: string;
}

export function BackTestRunFromJSON(json: any): BackTestRun {
    return BackTestRunFromJSONTyped(json, false);
}

export function BackTestRunFromJSONTyped(json: any, ignoreDiscriminator: boolean): BackTestRun {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'done': json['done'],
        'position': json['position'],
        'pnl': json['pnl'],
        'fee': json['fee'],
        'total': json['total'],
        'numLoose': json['numLoose'],
        'numWin': json['numWin'],
        'drawDownVal': json['drawDownVal'],
        'drawDownPer': json['drawDownPer'],
        'winStreak': json['winStreak'],
        'loseStreak': json['loseStreak'],
        'len': json['len'],
        'ident': !exists(json, 'ident') ? undefined : json['ident'],
        'config': !exists(json, 'config') ? undefined : json['config'],
        'path': !exists(json, 'path') ? undefined : json['path'],
    };
}

export function BackTestRunToJSON(value?: BackTestRun | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'done': value.done,
        'position': value.position,
        'pnl': value.pnl,
        'fee': value.fee,
        'total': value.total,
        'numLoose': value.numLoose,
        'numWin': value.numWin,
        'drawDownVal': value.drawDownVal,
        'drawDownPer': value.drawDownPer,
        'winStreak': value.winStreak,
        'loseStreak': value.loseStreak,
        'len': value.len,
        'ident': value.ident,
        'config': value.config,
        'path': value.path,
    };
}


