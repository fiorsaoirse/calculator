import { APP } from '../../app';
import { MakeFunction, OperationType } from '../../operations';
import { attachTag } from '../tag';
import { IPlainType, PLAIN_NUMBER } from './contracts';

const tag = (content: number): IPlainType => {
    return attachTag<typeof PLAIN_NUMBER>(PLAIN_NUMBER, content);
}

const make = (x: number): IPlainType => tag(x);

const add = (x: number, y: number): IPlainType => make(x + y);

const sub = (x: number, y: number): IPlainType => make(x - y);

const mul = (x: number, y: number): IPlainType => make(x * y);

const div = (x: number, y: number): IPlainType => make(x / y);

const stringify = (x: number): string => x.toString();

const install = (app: APP): MakeFunction => {
    const { register, getMethod } = app;

    const types = [PLAIN_NUMBER, PLAIN_NUMBER] as const;

    register(OperationType.Make, PLAIN_NUMBER, make);
    register(OperationType.Add, types, add);
    register(OperationType.Sub, types, sub);
    register(OperationType.Mul, types, mul);
    register(OperationType.Div, types, div);
    register(OperationType.Stringify, PLAIN_NUMBER, stringify);

    return getMethod(OperationType.Make, PLAIN_NUMBER);
}

export default install;