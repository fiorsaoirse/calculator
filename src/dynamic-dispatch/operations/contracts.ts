export enum OperationType {
    Make = 'make',
    Add = 'add',
    Sub = 'sub',
    Mul = 'mul',
    Div = 'div'
}

export type MakeFunction = (x: unknown) => unknown;

export type OperandsFunction = (x: unknown, y: unknown) => unknown;