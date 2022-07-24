import { app } from '../../../dynamic-dispatch';
import { installAdd, installStringify, MakeFunction } from '../../../dynamic-dispatch/operations';
import installPlainNumbers from '../../../dynamic-dispatch/packages/plain-numbers';

describe('Plain Number package', () => {
    let make: MakeFunction;
    let stringify: (x: any) => void;
    let add: (x: any, y: any) => any;

    beforeAll(() => {
        const application = app();

        make = installPlainNumbers(application);
        const { stringify: stringifyOperation } = installStringify(application.getMethod);
        const { add: addOperation } = installAdd(application.getMethod);

        stringify = stringifyOperation;
        add = addOperation;
    });

    it('Create plain number', () => {
        const num = 2;
        const created = make(num);

        expect(stringify(created)).toBe(num.toString());
    });

    it('Add plain numbers', () => {
        const two = 2;
        const five = 5;

        const twoNumber = make(two);
        const fiveNumber = make(five);

        expect(stringify(twoNumber)).toBe(two.toString());
        expect(stringify(fiveNumber)).toBe(five.toString());

        const seven = 7;

        const result = add(fiveNumber, twoNumber);
        expect(stringify(result)).toBe(seven.toString());

    });

});