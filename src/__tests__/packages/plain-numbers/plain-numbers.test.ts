import { app } from '../../../dynamic-dispatch';
import { MakeFunction } from '../../../dynamic-dispatch/operations';
import { installStringify } from '../../../dynamic-dispatch/operations/stringify';
import installPlainNumbers from '../../../dynamic-dispatch/packages/plain-numbers';

describe('Plain Number package', () => {
    let make: MakeFunction;
    let stringify: (x: any) => void;

    beforeAll(() => {
        const application = app();

        make = installPlainNumbers(application);
        const { stringify: stringifyOperation } = installStringify(application.getMethod);
        stringify = stringifyOperation;
    });

    it('Create plain number', () => {
        const num = 2;
        const created = make(num);

        expect(stringify(created)).toBe(num.toString());
    });

});