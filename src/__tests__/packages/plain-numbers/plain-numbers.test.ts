import { app } from '../../../dynamic-dispatch';
import { installOperations, installStringify, MakeFunction } from '../../../dynamic-dispatch/operations';
import installPlainNumbers from '../../../dynamic-dispatch/packages/plain-numbers';

describe('Plain Number package', () => {
    let make: MakeFunction;
    let stringify: (x: any) => void;
    let add: (x: any, y: any) => any;
    let sub: (x: any, y: any) => any;
    let mul: (x: any, y: any) => any;
    let div: (x: any, y: any) => any;

    beforeAll(() => {
        const application = app();

        make = installPlainNumbers(application);

        const { stringify: stringifyOperation } = installStringify(application.getMethod);

        const {
            add: addOperation,
            sub: subOperation,
            div: divOperation,
            mul: mulOperation
        } = installOperations(application.getMethod);

        stringify = stringifyOperation;

        add = addOperation;
        sub = subOperation;
        mul = mulOperation;
        div = divOperation;
    });

    it('Create plain number', () => {
        const num = 2;
        const created = make(num);

        expect(stringify(created)).toBe(num.toString());
    });

    it('Add plain numbers', () => {
        const two = make(2);
        const five = make(5);

        const seven = 7;

        const result = add(two, five);
        expect(stringify(result)).toBe(seven.toString());
    });

    it('Sub plain numbers', () => {
        const ten = make(10);
        const four = make(4);

        const six = 6;

        const result = sub(ten, four);
        expect(stringify(result)).toBe(six.toString());
    });

    it('Mul plain numbers', () => {
        const twelve = make(12);
        const eight = make(8);

        const ninetySix = 96;

        const result = mul(twelve, eight);
        expect(stringify(result)).toBe(ninetySix.toString())
    })

    it('Div plain numbers', () => {
        const oneHundredTwo = make(102);
        const two = make(2);

        const fiftyOne = 51;

        const result = div(oneHundredTwo, two);
        expect(stringify(result)).toBe(fiftyOne.toString());
    })

});