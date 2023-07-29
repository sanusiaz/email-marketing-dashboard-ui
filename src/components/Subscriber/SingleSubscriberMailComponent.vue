<template>
    <FormComponent>
        <template v-slot:title>
            <h3 class="font-medium  font-Poppins pt-4 pb-2 p-4">Send to <span class="text-[14px]">{{ selectedEmail }}</span>
            </h3>
            <hr>
        </template>

        <template v-slot:main_form>

            <!-- First Step -->
            <div class="steps relative p-3" v-show="stepCount === 1" :stepCount="stepCount">
                <div class="flex flex-col space-x-2">
                    <label for="subject" class="py-3 flex flex-col  px-0">
                        <span class="font-normal text-left font-Outfit py-2">Subject</span>
                        <input type="text" v-model="this.formData.subject"
                            class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150"
                            placeholder="Enter Subject" name="subject">

                    </label>
                </div>

                <div class="flex py-3 w-full justify-between">
                    <!-- Next Button -->
                    <span @click="this.stepCount = this.stepCount + 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
                        </svg>
                    </span>
                </div>
            </div>

            <!-- Second Step -->
            <div class="steps relative template p-3" v-show="stepCount === 2" :stepCount="stepCount">
                <span>Pick a template</span>

                <div class="overflow-y-auto max-h-[300px] mt-3 mb-2" data-simplebar data-simplebar-auto-hide="false">
                    <div class="grid grid-cols-2 gap-2 p-2 px-5 overflow-hidden">
                        <div v-for="template in templates" :key="template.id"
                            class="p-1 flex align-center justify-center group cursor-pointer hover:border-blue-700 border-2 border-gray-200 rounded relative"
                            :class="(this.formData.template === template.id) ? 'border-green-700' : ''">
                            <img :src="template.screenshot" :alt="template.name">

                            <div
                                class="absolute bg-[#c4c4c478] w-full hidden transition-all duration-400 group-hover:duration-400 group-hover:flex justify-center align-center items-center top-0 left-0 right-0 bottom-0">
                                <div class="actions flex space-x-3">
                                    <a :href="template.preview" target="__blank">
                                        <i title="View Template"
                                            class="fas fa-eye text-gray-800 hover:bg-blue-500 transition-all duration-200 hover:text-white p-2 bg-white rounded-md"></i>
                                    </a>
                                    <i @click="setSelectedTemplate(template.uuid)" title="Click To Select Template"
                                        class="fas fa-check text-gray-800 p-2 hover:bg-green-500 transition-all duration-200 hover:text-white bg-white rounded-md"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex py-3 w-full justify-between">
                    <!-- Prev -->
                    <span @click="this.stepCount = this.stepCount - 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                        </svg>
                    </span>
                    <!-- Next Button -->
                    <span @click="this.stepCount = this.stepCount + 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
                        </svg>
                    </span>
                </div>

            </div>

            <!-- Third Step is the message and send button -->
            <div class="steps relative p-3" style="z-index: 999;" v-show="stepCount === 3" :stepCount="stepCount">
                <!-- Message Box -->
                <div class="overflow-y-auto max-h-[300px] mt-3 mb-2" style="z-index: 9999;" data-simplebar data-simplebar-auto-hide="false">
                    <label for="message" class="flex flex-col mb-3 w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                        <textarea style="height: 1200px; " v-model="this.formData.message" name="message" id="message"
                            class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                            placeholder="Enter Message Here">{{ this.formData.message }}</textarea>
                    </label>
                </div>

                <div class="flex py-3 w-full justify-between" style="z-index: -1;">
                    <!-- Prev -->
                    <span @click="this.stepCount = this.stepCount - 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                        </svg>
                    </span>


                    <ButtonComponent @click.prevent="sendMessageToSubscriber()" type="submit"
                        class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                        <div
                            class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-max h-full relative top-0 left-0 right-0">
                            <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg> {{ (this.processingForm) ? 'Processing' : 'Send Message' }}
                        </div>
                    </ButtonComponent>

                </div>

            </div>



        </template>

        <template v-slot:button>

        </template>

    </FormComponent>

    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>

import axios from 'axios'
import FormComponent from '../FormsComponents/FormComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import PopupMessageComponent from '../PopupMessageComponent.vue'

import InitTinyMce from '../../services/InitTinyMce.js'


import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill'

export default {
    name: 'SingleSubscriberMailComponent',
    data() {
        return {
            popupMessage: '',
            statusText: '',
            formData: {
                subject: '',
                email: '',
                message: '',
                template: ''
            },
            stepCount: 1,
            allTemplates: [],
            processingForm: false
        }
    },

    props: {
        selectedEmail: {
            type: String,
            default: ''
        },
        templates: {
            type: Array,
            default: []
        }
    },

    methods: {

        
        // Send Message to receivers email
        async sendMessageToSubscriber() {
            this.statusText = this.popupMessage = ''
            this.processingForm = true
            try {
                let __response = await axios.post('/subscribers/single/mail', this.formData)
                if (__response.status === 200) {
                    this.statusText = 'success'
                    this.popupMessage = __response.data.message

                    // Close Form After 5 secs
                    setTimeout(() => {
                        this.$emit('closeForm', true)
                    }, 5000);
                }
                else {
                    this.statusText = 'error'
                    this.popupMessage = __response.data.message
                }

                this.processingForm = false

            } catch (error) {
                error = JSON.parse(error.response.request.response)
                this.statusText = 'error'
                this.popupMessage = error.message

                this.processingForm = false
            }

        },

        // Get Selected Template Content and parse it to message box
        async setSelectedTemplate(template) {
            // This will clear out previous messages / template 
            this.formData.message = ''

            this.formData.template = template

            this.statusText = this.popupMessage = ''

            let __SelectedTemplate = this.templates.filter((e) => {
                return e.uuid === template
            })


            if (__SelectedTemplate[0].preview !== undefined) {

                this.popupMessage = 'Parsing Templates Contents...'
                this.statusText = 'success'
                try {
                    let __contents = await axios.get(__SelectedTemplate[0].preview);
                    if (__contents.status === 200) {


                        this.formData.message = __contents.data
                        this.formData.email = this.selectedEmail
                        InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
                        this.popupMessage = 'Template has been selected'
                        this.statusText = 'success'

                        this.stepCount = this.stepCount + 1;
                    }


                } catch (error) {
                    error = JSON.parse(error.response.request.response)
                    this.statusText = 'error'
                    this.popupMessage = error.message
                }
            }
            else {
                this.popupMessage = 'No Preview found for this template'
                this.statusText = 'error'
            }




        }
    },
    components: { FormComponent, ButtonComponent, PopupMessageComponent }
}
</script>

<style lang="scss" scoped></style>