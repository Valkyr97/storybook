<script setup lang="ts">
import {computed} from "vue";
import FormBuilder from "../components/FormBuilder.vue";

interface response {
  data: {
    parcelService: {
      form: {
        sections: {
          title: string,
          fields: ({
            name: string,
            label: string,
            type: 'radio' | 'select' | 'checkbox' | 'number',
            mutable: boolean,
            private: boolean,
            conditions: any[],
            cost: never[],
            options?: any[]
          })[]
        }[]
      }
    }
  }
}


const data: response = {
  data: {
    "parcelService": {
      "form": {
        "sections": [
          {
            "title": "",
            "fields": [
              {
                "name": "lqiis2fm_j7zp7qwl",
                "label": "Edad",
                "type": "number",
                "mutable": true,
                "private": false,
                "conditions": [],
                "options": [],
                "cost": []
              },
              {
                "name": "lqiinxnv_ybtdjpyy",
                "label": "Bebida preferida",
                "type": "radio",
                "mutable": true,
                "private": false,
                "conditions": [
                  {
                    "id": "lqiis2fm_j7zp7qwl",
                    "operator": "GREATER_EQUAL",
                    "value": "18"
                  }
                ],
                "options": [
                  {
                    "key": "0",
                    "value": "Ron"
                  },
                  {
                    "key": "1",
                    "value": "Cerveza"
                  }
                ],
                "cost": []
              }
            ]
          }
        ]
      }
    }
  }
}

// const selectInputs = ['radio', 'select', 'checkbox']

const sections = computed(() => {
  return data.data.parcelService.form.sections.map(section =>
      ({
        ...section,
        fields: section.fields.map(field => ({
          ...field,
          options: field.options?.map(o => o.value)
        }))
      })
  )
})

// const schema = computed(() => sections.value?.flatMap(section => {
//   return section.fields.map(field => {
//     const props = {label: field.label, conditions: field.conditions, id: field.name}
//     if (selectInputs.includes(field.type)) {
//       return nodeBuilder('select', {
//         ...props,
//         //@ts-ignore
//         subtype: field.type
//       })
//     } else {
//       return nodeBuilder(
//           //@ts-ignore
//           field.type,
//           {
//             ...props,
//           })
//     }
//   })
// }))
</script>

<template>
  <div class="flex flex-col">
    <!--    <FormKitSchema :schema="schema"/>-->
    <div v-for="section in sections">
      <FormKit type="form">
        <template v-for="field in section.fields">
          <form-builder :id="field.name"
                        :el-type="field.type"
                        :label="field.label"
                        :options="field.options || []"
                        :conditions="field.conditions"
          />
        </template>
      </FormKit>
    </div>
  </div>

</template>

<style scoped>

</style>