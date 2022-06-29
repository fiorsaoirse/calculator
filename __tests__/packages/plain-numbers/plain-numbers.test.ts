import { app, GET_METHOD, REGISTER } from '../../../src/dynamic-dispatch';
import installPlainNumbers from '../../../src/dynamic-dispatch/packages/plain-numbers';

describe('Plain Number package', () => {
    let registerFn: REGISTER;
    let getMethodFn: GET_METHOD;

    let makePlainNumber;

    beforeAll(() => {
        const { register, getMethod } = app();
        registerFn = register;
        getMethodFn = getMethod;

        installPlainNumbers(registerFn);
    })

});