import type {Preview} from "@storybook/vue3";
import {setup} from '@storybook/vue3'
import {plugin, defaultConfig} from '@formkit/vue'
import config from '../formkit.config'
import '../src/tailwind.css'

setup((app) => {
    app.use(plugin, defaultConfig(config))
})

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

};

export default preview;
