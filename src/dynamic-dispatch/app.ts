import { MakeFunction, OperandsFunction, OperationType, StringifyFunction } from './operations';

type TYPE = string;
type TYPES = readonly [TYPE, TYPE];

type DYNAMIC_METHOD = Map<TYPE, MakeFunction | OperandsFunction>;
type DYNAMIC_TABLE = Map<OperationType, DYNAMIC_METHOD>;

const SEPARATOR = ':';

export type REGISTER = {
    (operation: Extract<OperationType, OperationType.Make>, type: TYPE, method: MakeFunction): void;
    (operation: Exclude<OperationType, OperationType.Make | OperationType.Stringify>, type: TYPES, method: OperandsFunction): void;
    (operation: Extract<OperationType, OperationType.Stringify>, type: TYPE, method: StringifyFunction): void;
}

export type GET_METHOD = {
    (operation: Extract<OperationType, OperationType.Make>, type: TYPE): MakeFunction;
    (operation: Exclude<OperationType, OperationType.Make | OperationType.Stringify>, type: TYPES): OperandsFunction;
    (operation: Extract<OperationType, OperationType.Stringify>, type: TYPE): StringifyFunction;
}

export type APP = {
    register: REGISTER,
    getMethod: GET_METHOD
}

const isString = (value: unknown): value is string => typeof value === 'string';

export function app(): APP {
    const dynamicDispatchTable: DYNAMIC_TABLE = new Map([
        [OperationType.Make, new Map<TYPE, MakeFunction>()],
        [OperationType.Add, new Map<TYPE, OperandsFunction>()],
        [OperationType.Sub, new Map<TYPE, OperandsFunction>()],
        [OperationType.Mul, new Map<TYPE, OperandsFunction>()],
        [OperationType.Div, new Map<TYPE, OperandsFunction>()],
        [OperationType.Stringify, new Map<TYPE, StringifyFunction>()],
    ]);

    function register(operation: Extract<OperationType, OperationType.Make>, type: TYPE, method: MakeFunction): void;
    function register(operation: Exclude<OperationType, OperationType.Make | OperationType.Stringify>, type: TYPES, method: OperandsFunction): void;
    function register(operation: Extract<OperationType, OperationType.Stringify>, type: TYPE, method: StringifyFunction): void;

    function register(
        operation: OperationType,
        type: TYPE | TYPES,
        method: MakeFunction | OperandsFunction
    ): void | never {
        if (operation === OperationType.Make) {
            if (!isString(type)) {
                throw new Error(`For make functions there is can be only one type in setting!`);
            }

            const makeTable = dynamicDispatchTable.get(OperationType.Make);
            makeTable!.set(type, method);

            return;
        }

        if (operation === OperationType.Stringify) {
            if (!isString(type)) {
                throw new Error(`For stringify functions there is can be only one type in setting!`);
            }

            const stringifyTable = dynamicDispatchTable.get(OperationType.Stringify);
            stringifyTable!.set(type, method);

            return;
        }

        if (isString(type)) {
            throw new Error(`For operands functions there is have to be two types in setting!`);
        }

        const operationTable = dynamicDispatchTable.get(operation);
        operationTable!.set(type.join(SEPARATOR), method);
    }

    function getMethod(operation: Extract<OperationType, OperationType.Make>, type: TYPE): MakeFunction;
    function getMethod(operation: Exclude<OperationType, OperationType.Make | OperationType.Stringify>, type: TYPES): OperandsFunction;
    function getMethod(operation: Extract<OperationType, OperationType.Stringify>, type: TYPE): StringifyFunction;

    function getMethod(operation: OperationType, type: TYPE | TYPES): MakeFunction | OperandsFunction | never {
        if (operation === OperationType.Make) {
            if (!isString(type)) {
                throw new Error(`The type key for make function has to be string`);
            }

            const makeTable = dynamicDispatchTable.get(OperationType.Make);
            const makeFunction = makeTable!.get(type);

            if (!makeFunction) {
                throw new Error(`Can not find the make method for type "${type}"!`);
            }

            return makeFunction;
        } else if (operation === OperationType.Stringify) {
            if (!isString(type)) {
                throw new Error(`The type key for stringify function has to be string`);
            }

            const stringifyTable = dynamicDispatchTable.get(OperationType.Stringify);
            const stringifyFunction = stringifyTable!.get(type);

            if (!stringifyFunction) {
                throw new Error(`Can not find the stringify method for type "${type}"!`);
            }

            return stringifyFunction;
        } else {
            if (!Array.isArray(type)) {
                throw new Error(`The type key for make function has to be array of types`);
            }

            const method = dynamicDispatchTable.get(operation);
            const func = method!.get(type.join(SEPARATOR));

            if (!func) {
                throw new Error(`Can not find the ${operation} method for type "${type}"!`);
            }

            return func;
        }
    }

    return {
        register,
        getMethod
    }
}
