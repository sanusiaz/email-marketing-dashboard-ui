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

                <button @click.prevent="submitForm()" type="submit"
                    class="text-sm bg-blue-700 w-max rounded-md duration-200 hover:duration-200 hover:bg-slate-700 font-Inter font-semibold text-white text-center p-3 px-5">
                    <span>Save</span>

                </button>
            </div>
        </template>
    </FormComponent>
</template>

<script>
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
            }
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
            await axios.post('/subscribers', this.formData)
                .then(response => {
                    if ( response.status === 201 ) {                        
                        // empty all form data 
                        this.formData.name = ''
                        this.formData.email = ''

                        this.$emit('getMessage', response.data.message)
                        this.$emit('getStatusText', 'success')
                    }
                    console.log(response)
                }).catch(error => {
                    console.error(error)
                    this.$emit('getMessage', error.response.data.message)
                    this.$emit('getStatusText', 'error')
                })
        },

        onInput: function (e) {
            this.$emit("update:modelValue", e.target.value);
        }
    },
    components: { FormComponent },
   
}
</script>

<style lang="scss" scoped></style>