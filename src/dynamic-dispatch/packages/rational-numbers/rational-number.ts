import { OperationType } from '../../operations';
import { register } from '../../generic';
import { attachTag } from '../tag';
import { IRationalNumber, RationalType, RATIONAL_NUMBER } from './contracts';

const gcd = (a: number, b: number): number => {
    if (b === 0) {
        return a;
    }

    return gcd(b, a % b);
}

const getNumer = (value: IRationalNumber): number => value.numer;

const getDenom = (value: IRationalNumber): number => value.denom;

const tag = (content: IRationalNumber): RationalType => {
    return attachTag(RATIONAL_NUMBER, content);
}

const make = (numer: number, denom: number): RationalType => tag({ numer, denom });

const add = (x: IRationalNumber, y: IRationalNumber): RationalType => {
    const numer = getNumer(x) * getDenom(y) + getNumer(y) * getDenom(x);
    const denom = getDenom(x) * getDenom(y);

    return make(numer, denom);
}

const sub = (x: IRationalNumber, y: IRationalNumber): RationalType => {
    const numer = getNumer(x) * getDenom(y) - getNumer(y) * getDenom(x);
    const denom = getDenom(x) * getDenom(y);

    return make(numer, denom);
}

const mul = (x: IRationalNumber, y: IRationalNumber): RationalType => {
    const numer = getNumer(x) * getNumer(y);
    const denom = getDenom(x) * getDenom(y);

    return make(numer, denom);
}

const div = (x: IRationalNumber, y: IRationalNumber): RationalType => {
    const numer = getNumer(x) * getDenom(y);
    const denom = getDenom(x) * getDenom(y);

    return make(numer, denom);
}

const install = (): void => {
    const types = [RATIONAL_NUMBER, RATIONAL_NUMBER] as const;

    register(OperationType.Make, RATIONAL_NUMBER, make);
    register(OperationType.Add, types, add);
    register(OperationType.Sub, types, sub);
    register(OperationType.Mul, types, mul);
    register(OperationType.Div, types, div);
}

export default install;