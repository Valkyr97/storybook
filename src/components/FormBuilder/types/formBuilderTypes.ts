export type IformType = 'text' | 'select' | 'number' | 'radio' | 'checkbox'

export interface IConditions {
    id?: string
    operator: comparisonOperatorValue,
    value: any
}

export type comparisonOperatorValue =
    'EQUAL' |
    'GREATER_EQUAL' |
    'GREATER_THAN' |
    'LESS_EQUAL' |
    'LESS_THAN' |
    'NOT_EQUAL'

export enum comparisonOperator {
    Equal = 'EQUAL',
    GreaterEqual = 'GREATER_EQUAL',
    GreaterThan = 'GREATER_THAN',
    LessEqual = 'LESS_EQUAL',
    LessThan = 'LESS_THAN',
    NotEqual = 'NOT_EQUAL'
}

export enum mathOperator {
    Add = 'ADD',
    Mul = 'MUL',
    Set = 'SET'
}