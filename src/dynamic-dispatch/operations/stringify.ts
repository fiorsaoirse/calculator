import { GET_METHOD } from '../app';
import { getContent, getTag } from '../packages/tag';
import { OperationType } from './contracts';

export type STRINGIFY_FUNCTION = (x: any) => string;

export function installStringify(getMethod: GET_METHOD): { stringify: STRINGIFY_FUNCTION } {
    // TODO: how can we set up the return type of the function? do we need a special interface?
    // TODO: allow to pass as params not only two arguments (use spread operator)
    const stringify = (x: any): string => {
        const type = getTag(x);
        const content = getContent(x);

        const method = getMethod(OperationType.Stringify, type);
        return method(content);
    }

    return { stringify }
}
