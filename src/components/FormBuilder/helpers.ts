export const operatorToSymbol = {
    'EQUAL': '===',
    'GREATER_EQUAL': '>=',
    'GREATER_THAN': '>',
    'LESS_EQUAL': '<=',
    'LESS_THAN': '<',
    'NOT_EQUAL': '!==',
    'Equal': '===',
    'GreaterEqual': '>=',
    'GreaterThan': '>',
    'LessEqual': '<=',
    'LessThan': '<',
    'NotEqual': '!=='
}

export const connectorToSymbol = {
    'OR': '||',
    "AND": "&&"
}

export const conditionValidator = /^.+?\s+(?:===|\|\||>=|>|<=|<|!==)\s+.*$/

export const sortOperationBySetFirst = (a: string, b: string) => {
    a.toUpperCase()
    b.toUpperCase()
    if (a.startsWith('SET') && !b.startsWith('SET')) {
        return -1; // a before b
    } else if (!a.startsWith('SET') && b.startsWith('SET')) {
        return 1; // a after b
    } else {
        return 0;
    }
}