import { getMethod } from '../generic';
import { PLAIN_NUMBER } from '../packages/plain-numbers/contracts';
import { RATIONAL_NUMBER } from '../packages/rational-numbers/contracts';
import { MakeFunction, OperationType } from './contracts';

// TODO: how can we set up the return type of the function? do we need a special interface?
const makePlain = (x: number): MakeFunction => {
    const method = getMethod(OperationType.Make, PLAIN_NUMBER);
    return method(x) as MakeFunction;
}

const makeRational = (x: number, y: number): MakeFunction => {
    const method = getMethod(OperationType.Make, RATIONAL_NUMBER);
    return method(x) as MakeFunction;
}