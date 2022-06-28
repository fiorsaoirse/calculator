import { getMehtod } from '../generic';
import { PLAIN_NUMBER } from '../packages/plain-numbers/contracts';
import { RATIONAL_NUMBER } from '../packages/rational-numbers/contracts';
import { MakeFunction, OperationType } from './contracts';

// TODO: а как быть с типами возврата? какой должен быть интерфейс?
const makePlain = (x: number): MakeFunction => {
    const method = getMehtod(OperationType.Make, PLAIN_NUMBER);
    return method(x);
}

const makeRational = (x: number, y: number): MakeFunction => {
    const method = getMehtod(OperationType.Make, RATIONAL_NUMBER);
    return method(x);
}