<template>
    <div class="relative w-full mb-3">
        <label class="block uppercase text-slate-600 text-xs font-bold mb-2" :for="label"> {{ label }} </label>

        
        <input v-if="textarea === 'false'" :type="type" v-model="formData" @change="passDataToForm(formData)"
            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            :placeholder="placeholder" :pattern="pattern">
        
        <textarea v-if="textarea === 'true'" v-model="formData" @change="passDataToForm()" :cols="cols" :rows="rows" class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></textarea>
    </div>
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
                // pass data to form compoents 
                this.$emit('inputData', this.formData)
            }
        },

        props: {
            label: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                default: '',
                type: String 
            },
            textarea: {
                type: String,
                default: 'false'
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
            }
        }
    }
</script>