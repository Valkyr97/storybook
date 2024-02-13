import {defaultConfig} from '@formkit/vue'
import {rootClasses} from './formkit.theme.ts'
import {FormKitOptions} from "@formkit/core";

const config: FormKitOptions = defaultConfig({
    config: {
        rootClasses
    }
})

export default config