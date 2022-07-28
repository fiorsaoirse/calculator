import { GET_METHOD } from '../app';
import { getContent, getTag, ITaggedEntity } from '../packages/tag';
import { OperationType } from './contracts';

export type OPERANDS_FUNCTION = (x: any, y: any) => OperationType;
export type STRINGIFY_FUNCTION = (x: any) => string;

export type OPERANDS_FUNCTIONS = {
    add: OPERANDS_FUNCTION;
    sub: OPERANDS_FUNCTION;
    mul: OPERANDS_FUNCTION;
    div: OPERANDS_FUNCTION;
    stringify: STRINGIFY_FUNCTION;
}

export function installOperations(getMethod: GET_METHOD): OPERANDS_FUNCTIONS {
    function generic(type: OperationType.Stringify): STRINGIFY_FUNCTION;
    function generic(type: Exclude<OperationType, OperationType.Make | OperationType.Stringify>): OPERANDS_FUNCTION;

    function generic<T extends string>(type: Exclude<OperationType, OperationType.Make>): OPERANDS_FUNCTION | STRINGIFY_FUNCTION {
        if (type === OperationType.Stringify) {
            return (x: ITaggedEntity<T>): string => {
                const method = getMethod(OperationType.Stringify, getTag(x));
                return method(getContent(x));
            }
        } else {
            return (x: ITaggedEntity<T>, y: ITaggedEntity<T>): OperationType => {
                const types = [getTag(x), getTag(y)] as const;
                const method = getMethod(type, types);
                return method(getContent(x), getContent(y));
            }
        }
    }

    const add = generic(OperationType.Add);
    const sub = generic(OperationType.Sub);
    const mul = generic(OperationType.Mul);
    const div = generic(OperationType.Div);
    const stringify = generic(OperationType.Stringify);

    return { add, sub, mul, div, stringify };
}