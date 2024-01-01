export type IformType =
    'radio'
    | 'text'
    | 'number'
    | 'scale'
    | 'date'
    | 'time'
    | 'section'
    | 'file'
    | 'select'
    | 'checkbox'

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

export type mathOperatorValue = 'ADD' | 'MUL' | 'SET'


export type FormSection = {
    /** A list of fields contained in this section. */
    fields: FormField[];
    /** The title of this section, visible to the user. */
    title: string;
}

export interface FormCondition {
    name: string;
    operator: comparisonOperatorValue;
    value: string;
}

export interface FormCostItem {
    condition?: FormCondition;
    operator: mathOperator | mathOperatorValue;
    value: string;
}

export interface FormOptionItem {
    key: string;
    value: string;
}

export type FormField = {
    /** A list of conditions required for this field to be visible. */
    conditions?: Array<FormCondition>;
    /** The operators used to calculate this field's contribution to the form's cost. */
    cost?: Array<FormCostItem>;
    /** A user-readable label for this field. */
    label?: string;
    /** Whether this field's value can be modified after its submission (e.g. by admins). */
    mutable?: boolean;
    /** A reference (private) name for this field. */
    name: string;
    /** A list of options for this field. */
    options?: Array<FormOptionItem>;
    /** Whether this field should only be visible for the submitter (and not to admins). */
    private?: boolean;
    /** The type of input accepted by this field. */
    type: IformType;
    /** An optional set of validation rules for this field. */
    validation?: any;
}

export interface IPriceModifiers {
    condition: ICondition,
    operator: comparisonOperator | comparisonOperatorValue,
    value: string
}

export interface ICondition {
    name?: string,
    operator: comparisonOperatorValue | comparisonOperator,
    value: string
}