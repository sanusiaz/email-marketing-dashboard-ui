<template>
    <FormComponent enctype="multipart-form-data">
        <template v-slot:main_form>

            <div class="flex flex-col space-y-6 p-2 py-5 pb-0">
                <div class="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                    <!-- Subscribers Name -->
                <label for="name" class="flex flex-col w-full space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Name: </span>
                    <input name="name" id="name" type="text"
                    v-model="this.formData.name"
                        col="30" rows="5"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Enter Subcriber Name">
                </label>
                

                <!-- Subscribers Email -->
                <label for="email" class="flex flex-col w-full space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Email Address: </span>
                    <input name="email" id="email" type="text"
                    v-model="this.formData.email"
                        col="30" rows="5"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Enter Subscriber Email Address">
                </label>
                </div>
                

                <!-- Submit Button -->
                 <ButtonComponent  @click.prevent="submitForm()" type="submit"
                    class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                        <div class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-full h-full relative top-0 left-0 right-0">
                            <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> {{  ( this.processingForm  ) ? 'Processing' : 'Save'  }}
                        </div>
                    </ButtonComponent>
            </div>
        </template>
    </FormComponent>
</template>

<script>

import ButtonComponent from '@/components/Auth/ButtonComponent.vue'
import axios from 'axios'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
import FormComponent from '../FormsComponents/FormComponent.vue';


export default {
    name: "SubscribersCreateComponent",
    data() {
        return {
            formData: {
                name: '',
                email: '',
            },
            processingForm: false
        }
    },

    props: {
        templates: {
            type: Array
        }
    },
    methods: {
        async submitForm() {
            this.$emit('getMessage', '')
            this.$emit('getStatusText', '')
            this.processingForm = true
            await axios.post('/subscribers', this.formData)
                .then(response => {
                    if ( response.status === 201 ) {                        
                        // empty all form data 
                        this.formData.name = ''
                        this.formData.email = ''

                        this.$emit('getMessage', response.data.message)
                        this.$emit('getStatusText', 'success')

                        this.$emit('closeComponent', 'true')
                        this.processingForm = true
                    }
                }).catch(error => {
                    this.$emit('getMessage', error.response.data.message)
                    this.$emit('getStatusText', 'error')
                    this.processingForm = true
                })
        },

        onInput: function (e) {
            this.$emit("update:modelValue", e.target.value);
        }
    },
    components: {
    ButtonComponent, FormComponent },
   
}
</script>

<style lang="scss" scoped></style>