import { GET_METHOD } from '../app';
import { getContent, getTag, ITaggedEntity } from '../packages/tag';
import { OperationType } from './contracts';

export type ADD_FUNCTION = (x: any, y: any) => OperationType;

export function installAdd(getMethod: GET_METHOD): { add: ADD_FUNCTION } {
    // TODO: how can we set up the return type of the function? do we need a special interface?
    // TODO: allow to pass as params not only two arguments (use spread operator)
    const add = <T extends string>(x: ITaggedEntity<T>, y: ITaggedEntity<T>): OperationType => {
        const types = [getTag(x), getTag(y)] as const;

        const method = getMethod(OperationType.Add, types);
        return method(getContent(x), getContent(y));
    }

    return { add }
}
