export type IformType = 'text' | 'select' | 'number' | 'radio' | 'checkbox'

export interface IConditions {
    id: string
    operator: comparisonOperator,
    value: any
}

export enum comparisonOperator {
    Equal = 'EQUAL',
    GreaterEqual = 'GREATER_EQUAL',
    GreaterThan = 'GREATER_THAN',
    LessEqual = 'LESS_EQUAL',
    LessThan = 'LESS_THAN',
    NotEqual = 'NOT_EQUAL'
}