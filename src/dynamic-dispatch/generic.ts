import { OperationType } from './operations';

type TYPES<T extends string> = readonly [T, T];

const dynamicDispatchTable = new Map();

export const register = <T extends string>(
    operation: OperationType,
    types: TYPES<T>,
    method: any
): void => {

}

export const getMehtod = <T extends string>(operation: OperationType, type: T): any => {

}