import {IConditions, IformType} from "./types/formBuilderTypes.ts";
import {operatorToSymbol} from "./helpers.ts";

export const nodeBuilder = (type: IformType, config: {
    label?: string,
    id?: string,
    options?: any[],
    conditions?: IConditions[]
    validation?: any,
}) => {
    const {
        label,
        id,
        options,
        conditions,
        validation
    } = config
    const node: any = {
        $formkit: type,
        id,
        label,
    }

    if (options && options.length > 0) {
        node["options"] = options
    }

    if (conditions && conditions.length > 0) {
        node['if'] = conditions.reduce((previousValue, currentValue, currentIndex) => {
            let condition = `$get(${currentValue.id}).value ${operatorToSymbol[currentValue.operator]} ${currentValue.value}`
            if (currentIndex === 0) {
                return previousValue + condition
            } else {
                return previousValue + `&& ${condition}`
            }
        }, '')
    }

    if (validation) {
        node['validation'] = validation.required ? 'required' : ''
        switch (type) {
            case "number":
                if (validation.min || validation.min === 0) {
                    node.validation += `|min:${validation.min}`
                    node['min'] = validation.min
                }

                if (validation.max || validation.max === 0) {
                    node.validation += `|max:${validation.max}`
                    node['max'] = validation.max
                }

                if (validation.integer) {
                    node['number'] = 'integer'
                    node['step'] = 1
                    node.validation += 'matches:/^(-?\\d+)$/'

                    if(!node['validation-messages'])
                        node['validation-messages'] = {}

                    node['validation-messages']['matches'] = `${label && label + ' '}debe ser un número entero`
                }
                break
            case "text":
                if (validation.length) {

                }
        }
    }

    return node
}