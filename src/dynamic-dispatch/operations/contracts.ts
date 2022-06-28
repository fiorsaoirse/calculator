export enum OperationType {
    Make = 'make',
    Add = 'add',
    Sub = 'sub',
    Mul = 'mul',
    Div = 'div'
}

export type MakeFunction = (x: any) => any;

export type OperandsFunction = (x: any, y: any) => any;