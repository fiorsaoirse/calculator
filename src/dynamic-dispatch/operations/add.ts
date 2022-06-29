import { getMethod } from '../generic';
import { getTag } from '../packages/tag';
import { OperationType } from './contracts';

// TODO: how can we set up the return type of the function? do we need a special interface?
// TODO: allow to pass as params not only two arguments (use spread operator)
export const add = (x: any, y: any): OperationType => {
    const types = [getTag(x), getTag(y)] as const;

    const method = getMethod(OperationType.Add, types);
    return method(x, y);
}
