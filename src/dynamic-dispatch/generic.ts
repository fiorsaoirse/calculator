import { MakeFunction, OperandsFunction, OperationType } from './operations';

type TYPE = string;
type TYPES = readonly [TYPE, TYPE];

type DYNAMIC_METHOD = Map<TYPE, MakeFunction | OperandsFunction>;
type DYNAMIC_TABLE = Map<OperationType, DYNAMIC_METHOD>;

const dynamicDispatchTable: DYNAMIC_TABLE = new Map([
    [OperationType.Make, new Map<TYPE, MakeFunction>()],
    [OperationType.Add, new Map<TYPE, OperandsFunction>()],
    [OperationType.Sub, new Map<TYPE, OperandsFunction>()],
    [OperationType.Mul, new Map<TYPE, OperandsFunction>()],
    [OperationType.Div, new Map<TYPE, OperandsFunction>()],
]);

const isString = (value: unknown): value is string => typeof value === 'string';

// const isMakeFunction = (value: unknown): value is MakeFunction => {
//     return typeof value === 'function' && value.
// }

export const register = (
    operation: OperationType,
    type: TYPE | TYPES,
    method: MakeFunction | OperandsFunction
): void | never => {
    if (operation === OperationType.Make) {
        if (!isString(type)) {
            throw new Error(`For make functions there is can be only one type in setting!`);
        }

        const makeTable = dynamicDispatchTable.get(OperationType.Make);
        makeTable!.set(type, method);

        return;
    }

    if (isString(type)) {
        throw new Error(`For operands functions there is have to be two types in setting!`);
    }

    const operationTable = dynamicDispatchTable.get(operation);
    operationTable!.set(type.join(','), method);
}

export function getMethod(operation: Extract<OperationType, OperationType.Make>, type: TYPE): MakeFunction;
export function getMethod(operation: Exclude<OperationType, OperationType.Make>, type: TYPES): OperandsFunction;

export function getMethod(operation: OperationType, type: TYPE | TYPES): MakeFunction | OperandsFunction | never {
    if (operation === OperationType.Make) {
        const makes = dynamicDispatchTable.get(OperationType.Make);

        if (!isString(type)) {
            throw new Error(`The type key for make function has to be string`);
        }

        const makeFunction = makes!.get(type);

        if (!makeFunction) {
            throw new Error(`Can not find the make method for type "${type}"!`);
        }

        return makeFunction;
    }

    if (!isString(type)) {
        throw new Error(`The type key for make function has to be array of types`);
    }

    const method = dynamicDispatchTable.get(operation);
    const func = method!.get(type);

    if (!func) {
        throw new Error(`Can not find the ${operation} method for type "${type}"!`);
    }

    return func;
}