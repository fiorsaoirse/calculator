import { GET_METHOD } from '../app';
import { getContent, getTag, ITaggedEntity } from '../packages/tag';
import { OperationType } from './contracts';

export type OPERANDS_FUNCTION = (x: any, y: any) => OperationType;

export type OPERANDS_FUNCTIONS = {
    add: OPERANDS_FUNCTION,
    sub: OPERANDS_FUNCTION,
    mul: OPERANDS_FUNCTION,
    div: OPERANDS_FUNCTION;
}

export function installOperations(getMethod: GET_METHOD): OPERANDS_FUNCTIONS {
    const generic = (type: Exclude<OperationType, OperationType.Make | OperationType.Stringify>) => {
        return <T extends string>(x: ITaggedEntity<T>, y: ITaggedEntity<T>): OperationType => {
            const types = [getTag(x), getTag(y)] as const;
            const method = getMethod(type, types);
            return method(getContent(x), getContent(y));
        }
    }

    const add = generic(OperationType.Add);
    const sub = generic(OperationType.Sub);
    const mul = generic(OperationType.Mul);
    const div = generic(OperationType.Div)

    return { add, sub, mul, div };
}