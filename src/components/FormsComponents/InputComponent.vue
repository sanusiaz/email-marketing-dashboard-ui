<template>
    <label :for="label" class="py-3 flex flex-col  px-0">
        <span class="font-normal text-left font-Outfit py-2">{{ label }}</span>
        <input v-if="type !== 'dropdown' && type !== 'textarea'" :type="type" v-model="formData" @change="passDataToForm(formData)"
               class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150"
               :placeholder="placeholder"  :name="name">


        <select  v-model="formData" :name="name" class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150" v-if="type === 'dropdown'">
            <option value="" selected disabled>Please Select a value</option>
            <option v-for="option in options" :key="option.id" :value="option.value">{{ option.name }}</option>
        </select>
    </label>
</template>

<script>
    export default {
        name: 'InputComponent',
        data() {
            return {
                formData: ''
            }
        },

        methods: {
            passDataToForm() {
                this.$emit('passData', this.formData)
            }
        },

        props: {
            label: {
                type: String,
                required: true
            },
            name: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                default: '',
                type: String 
            },
            cols: {
                type: String,
                default: ''
            },
            rows: {
                type: String,
                default: ''
            },
            pattern: {
                type: String,
                default: ''
            },

            options: {
                type: Object,
                default: {}
            }
        
        }
    }
</script>

<style lang="scss" scoped>

</style>