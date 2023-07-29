<template>
    <FormComponent>
        <template v-slot:main_form>

            <div class="flex flex-col space-x-2">
                <label for="subject" class="py-3 flex flex-col  px-0">
                    <span class="font-normal text-left font-Outfit py-2">Subject</span>
                    <input type="text" v-model="this.formData.subject"
                        class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150"
                        placeholder="Enter Subject" name="subject">

                </label>
            </div>

            <!-- Message Box -->

            <label for="message" class="flex flex-col mb-3 w-full space-y-3">
                <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                <textarea style="height: 500px;" v-model="this.formData.message" name="message" id="message"
                    class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                    placeholder="Enter Message Here">{{ this.formData.message }}</textarea>
            </label>

            <ButtonComponent
                class="text-sm cursor-pointer bg-blue-700 w-max rounded-md duration-200 hover:duration-200 hover:bg-slate-700 font-Inter font-semibold text-white text-center p-3 px-5"
                @click.prevent="submitForm()" type="submit">
                <div
                    class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-full h-full relative top-0 left-0 right-0">
                    <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg> {{ (this.processingForm) ? 'Processing' : 'Set Message' }}
                </div>
            </ButtonComponent>

        </template>

        <template v-slot:button>

        </template>

    </FormComponent>
</template>

<script>
import axios from 'axios'
import FormComponent from '../FormsComponents/FormComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import PopupMessageComponent from '../PopupMessageComponent.vue'

import InitTinyMce from '../../services/InitTinyMce.js'

export default {
    name: 'UnsubscribeEmailComponent',
    data() {
        return {
            formData: {
                message: '',
                subject: ''
            },
            processingForm: false
        }
    },
    props: {
        templates: {
            type: Array
        },
        title: {
            type: String,
            default: 'Default UnSubscribe Email'
        }
    },

    methods: {
        async submitForm() {
            this.processingForm = true
            this.$emit('getMessage', '')
            this.$emit('getStatusText', '')
            try {
                let __response = await axios.post('/subscribers/unsubscribe', this.formData)
                if (__response.status === 201) {
                    this.$emit('getMessage', __response.data.message)
                    this.$emit('getStatusText', 'success')
                }
                else {
                    this.$emit('getMessage', 'Internal Server Error')
                    this.$emit('getStatusText', 'error')
                }
                this.processingForm = false

            } catch (error) {
                if (error.response.data.message !== undefined && error.response.data.message !== "") {
                    this.$emit('getMessage', error.response.data.message)
                }
                else {
                    this.$emit('getMessage', 'Internal Server Error')
                }
                this.$emit('getStatusText', 'error')
                this.processingForm = false

            }
        }
    },
    components: { FormComponent, ButtonComponent, PopupMessageComponent },
    async mounted() {

        InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);

        this.$emit('getTitle', this.title)
        this.$emit('getMessage', '')
        this.$emit('getStatusText', '')
        // load default new subscirber message
        try {
            let __response = await axios.get('/subscribers/unsubscribe');
            if (__response.status === 200) {
                if (__response.data.data !== null) {
                    this.formData.subject = __response.data.data.subject;
                    this.formData.message = __response.data.data.message;
                    this.$emit('getMessage', __response.data.message)
                    this.$emit('getStatusText', 'success')

                }
                InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);

            }
        } catch (error) {
            error = JSON.parse(error.response.request.response)

            this.$emit('getMessage', error.message)
            this.$emit('getStatusText', 'error')
        }

    }

}
</script>

<style lang="scss" scoped></style>