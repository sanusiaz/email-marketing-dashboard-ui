<template>
    <div class="main_contents pt-32 px-10">
        <router-link :to="{ name: 'admin-newsletter-show', params: { id: this.newsletterId } }"
            class="font-semibold font-OpenSans py-2 relative w-max text-sm text-white bg-blue-600 rounded p-1 px-4 flex gap-2 align-middle items-center duration-200 hover:duration-200 hover:bg-white border border-blue-700 hover:shadow-md hover:text-blue-700 mb-3">
            <i class="fas fa-chevron-left"></i>
            <span>Back</span>
        </router-link>




        <FormComponent @submit.prevent="submit()">
            <template v-slot:title>
                <h3 class="font-medium capitalize text-xl pt-4 pb-2">{{ text }}</h3>
                <hr>
            </template>

            <template v-slot:main_form>

                <section class="flex flex-col gap-10 md:gap-20">
                    <!-- first Step -->
                    <div class="steps relative pt-5" v-show="stepCount === 1" :stepCount="stepCount">

                        <div class="grid md:grid-cols-2 gap-10">
                            <div class="space-x-2 w-full">
                                <label for="name" class="py-3 flex flex-col p-1 px-1">
                                    <span class="font-normal text-left font-Outfit py-2">Name</span>
                                    <input type="text" v-model="this.formData.name"
                                        class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150"
                                        placeholder="Enter Name" name="name">

                                </label>
                            </div>

                            <div class="space-x-2 w-full">
                                <label for="subject" class="py-3 flex flex-col p-1 px-1">
                                    <span class="font-normal text-left font-Outfit py-2">Subject</span>
                                    <input type="text" v-model="this.formData.subject"
                                        class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150"
                                        placeholder="Enter Subject" name="subject">

                                </label>
                            </div>
                        </div>


                        <div class="bg-white p-2 rounded-md border border-gray-200">
                            <span
                                class="p-2 py-4 border-b border-gray-700 block relative font-semibold capitalize font-Poppins">Pick
                                a template</span>

                            <div class=" overflow-y-auto max-h-[300px] mt-3 mb-2 p-3 sm:p-5 md:p-7 " data-simplebar
                                data-simplebar-auto-hide="false">
                                <div
                                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 p-2 px-5 overflow-hidden">
                                    <div v-for="template in templates" :key="template.uuid"
                                        class="shadow-md p-2 hover:shadow-lg flex align-center justify-center group cursor-pointer hover:border-blue-700 border-2 border-gray-200 rounded relative"
                                        :class="(this.formData.template === template.uuid) ? 'border-green-700' : ''">
                                        <img :src="template.screenshot" :alt="template.name">
                                        <div
                                            class="absolute bg-[#c4c4c478] w-full hidden transition-all duration-400 group-hover:duration-400 group-hover:flex justify-center align-center items-center top-0 left-0 right-0 bottom-0">
                                            <div class="actions flex space-x-3">
                                                <a :href="template.preview" target="__blank">
                                                    <i title="View Template"
                                                        class="fas fa-eye text-gray-800 hover:bg-blue-500 transition-all duration-200 hover:text-white p-2 bg-white rounded-md"></i>
                                                </a>
                                                <i @click="setSelectedTemplate(template.uuid)"
                                                    title="Click To Select Template"
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
                    </div>

                    <!-- Second Step -->
                    <div class="steps relative pt-5" v-show="stepCount === 2" :stepCount="stepCount">
                        <span class="font-Inter underline pt-5">Send to:</span>

                        <div class="overflow-y-auto mt-3 mb-2 px-3 pr-4">

                            <span v-if="!this.isForRecipients" class="pr-2 font-normal text-sm font-Inter">Selected Email
                                Lists: {{ this.formData.listName }}</span> <span
                                class="font-semibold text-sm font-OpenSans">{{ this.formData.selectedList }}</span>
                            <select @change="setEmails" v-if="!this.isForRecipients" v-model="this.formData.listsId"
                                name="email_folder"
                                class="border border-gray-400 font-Inter px-3 py-3 placeholder-slate-400 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-slate-500 focus:ring-1 w-full ease-linear transition-all duration-150">
                                <option value="" aria-selected="" disabled>Please Select a value</option>
                                <option v-for="option in emailListsFolders" :selected="option.id === this.formData.lists"
                                    :key="option.id" :value="option.id">
                                    {{ option.name }}</option>
                            </select>

                            <!-- Recipients Emails -->
                            <label
                                v-if="this.isForRecipients === true || (this.formData.recipients !== null && this.formData.recipients !== '')"
                                for="message" class="py-3 flex flex-col  px-1">
                                <span class="font-normal text-left font-Outfit py-2">Recipients Emails</span>
                                <!-- Show Mesage Box to enter email message -->
                                <textarea
                                    class="text-sm w-full block relative outline-none border border-gray-400 p-3 rounded focus:ring-1 focus-ring-slate-200"
                                    v-model="this.formData.recipients" name="recipients" id="recipients" cols="30" rows="10"
                                    placeholder="Enter Recipients email, seperate each with (,)">{{ this.formData.recipients }}</textarea>
                            </label>

                            <span @click="this.isForRecipients = !this.isForRecipients"
                                class="text-gray-500 py-4 cursor-pointer hover:text-gray-800 underline block">Or: {{ (
                                    this.isForRecipients === false) ? 'Recipients' : 'Email Lists' }}</span>

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


                    <!-- Third Step -->
                    <div class="steps relative pt-5" v-show="stepCount === 3" :stepCount="stepCount">

                        <span class="text-sm font-semibold text-left font-Poppins">Message: </span>

                        <div class="overflow-y-auto mt-3 mb-2  relative z-40 h-[400px] md:h-[500px] " data-simplebar
                            data-simplebar-auto-hide="false">
                            <label for="message" class="flex flex-col mb-3 w-full space-y-3 pr-2">
                                <textarea style="height: 500px;" v-model="this.formData.message" name="message" id="message"
                                    class="rounded-md bg-white p-3 mr-3 w-full text-sm placeholder:text-gray-400"
                                    placeholder="Enter Message Here">{{ this.formData.message }}</textarea>
                            </label>
                        </div>

                        <div class="flex py-3 w-full justify-between relative overflow-hidden">
                            <!-- Prev -->
                            <span @click="this.stepCount = this.stepCount - 1"
                                class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                                </svg>
                            </span>


                            <ButtonComponent @click.prevent="submit()" type="submit"
                                class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                                <div
                                    class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-max h-full relative top-0 left-0 right-0">
                                    <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg> {{ (this.processingForm) ? 'Processing' : 'Update' }}
                                </div>
                            </ButtonComponent>
                        </div>

                    </div>



                </section>

            </template>
        </FormComponent>

    </div>


    <!-- Popup Message -->
    <PopupMessageComponent v-if="this.popupMessage !== ''" :popupMessage="this.popupMessage" :statusText="this.statusText">
    </PopupMessageComponent>
</template>

<script>

import axios from 'axios'
import PopupMessageComponent from '@/components/PopupMessageComponent.vue'

import ButtonComponent from '@/components/Auth/ButtonComponent.vue'
import FormComponent from '@/components/FormsComponents/FormComponent.vue'

import InitTinyMce from '../../services/InitTinyMce'


export default {
    name: 'UpdateNewsLetterComponent',
    data() {
        return {
            formData: {
                id: null,
                name: null,
                recipients: null,
                lists: null,
                template: null,
                message: null,
                created: null,
                sendTo: null,
                listId: null
            },
            stepCount: 1,
            selectedList: '',
            isForRecipients: false,
            emailListsFolders: [],
            templates: [],
            text: 'Update Newsletter',
            processingForm: false,
            statusText: '',
            popupMessage: ''
        }
    },

    props: {
        id: {
            default: null
        }
    },

    components: { ButtonComponent, PopupMessageComponent, FormComponent },

    watch: {

        // Watch is campaign is set for recipients
        isForRecipients(value) {
            if (value) {
                this.formData.lists = null
            }
            else {
                this.formData.recipients = null
            }
        }
    },

    methods: {

        async getTemplatesContents(__uuid) {
            if (__uuid !== null && __uuid !== '') {
                try {
                    let response = await axios.get(`/templates/${__uuid}`)
                    if (response.status === 200) {
                        this.formData.message = response.data
                        InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
                    }
                } catch (error) {
                }
            }
        },

        // Get Selected Template Content and parse it to message box
        async setSelectedTemplate(template) {
            this.formData.message = ''
            this.popupMessage = this.statusText = ''

            InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
            this.formData.template = template

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
                        InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
                        this.popupMessage = 'Template has been selected'
                        this.statusText = 'success'

                        this.stepCount = this.stepCount + 1;
                    }


                } catch (error) {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== undefined
                        && error.request.response !== '')
                        ? JSON.parse(error.request.response).message
                        : 'Internal Server Error'

                    this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message
                }
            }
            else {
                this.popupMessage = 'No Preview found for this template'
                this.statusText = 'error'
            }
        },

        setEmails(element) {
            let __listId = element.target.value;
            __listId = parseInt(__listId)
            this.formData.lists = __listId
            this.formData.selectedList = this.emailListsFolders.filter(function (a) {
                return a.id === __listId
            }).pop().name

        },

        // Get all newsletter templates 
        async getAllTemplate() {
            this.$emit('getTitle', '')
            let __response = await axios.get('/templates/campaigns')
            if (__response.status === 200) {
                this.templates = __response.data.data
            }
        },


        // Get all email lists folders
        async getAllListsFolders() {
            try {
                let __response = await axios.get('/lists');
                if (__response.status === 200 && __response.statusText !== 'error') {
                    if (Array.isArray(__response.data.data)) {
                        this.emailListsFolders = __response.data.data;
                        this.emailListsFolders = this.emailListsFolders.filter((e) => {
                            return e.folderRef !== ''
                        })
                    }
                }
            } catch (error) {
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message
            }
        },

        // Update Campaign Message
        async submit() {
            if (this.newsletterId !== null && this.newsletterId !== undefined) {

                this.statusText = ''
                this.popupMessage = ''
                this.processingForm = true
                try {
                    let __response = await axios.patch(`/newsletters/${this.newsletterId}`, this.formData)

                    if (__response.status === 201) {
                        this.popupMessage = __response.data.message
                        this.statusText = 'success'
                    }
                    else {
                        this.popupMessage = 'An Error Occurred. Please Try Again'
                        this.statusText = 'error'
                    }
                    this.processingForm = false
                } catch (error) {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== undefined
                        && error.request.response !== '')
                        ? JSON.parse(error.request.response).message
                        : 'Internal Server Error'

                    this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message
                    this.processingForm = false
                }
            }
            else {
                this.popupMessage = 'Invalid Newsletter'
                this.statusText = 'error'
            }
        },

        async getNewsLetterInfo() {
            this.popupMessage = this.statusText = ''
            try {
                this.popupMessage = 'Parsing Contents. Please Wait..'
                this.statusText = 'success'
                let __response = await axios.get('/newsletters/' + this.newsletterId + '?includeMessage=true')
                if (__response.status === 200) {

                    let __data = __response.data.data;
                    this.formData.id = __data.id
                    this.formData.name = __data.name
                    this.formData.subject = __data.subject

                    this.formData.selectedList = __data.selectedList
                    this.formData.listName = __data.lists

                    this.formData.lists = __data.listId
                    if (__data.listId === null) {
                        this.isForRecipients = true
                    }
                    else {
                        this.isForRecipients = false
                    }
                    this.formData.sendTo = __data.sendTo
                    this.formData.recipients = (__data.recipients !== null) ?
                        __data.recipients.join(', ') : null
                    this.formData.template = __data.template

                    this.formData.created = __data.createdAt
                    this.formData.message = __response.data.message

                    if (this.formData.message === null) {
                        this.getTemplatesContents(this.formData.template)
                    }
                    else {
                        InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
                    }
                }
            } catch (error) {
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message
            }
        },

    },

    mounted() {
        this.getAllTemplate()
        this.getNewsLetterInfo()
        this.getAllListsFolders()
    },

    created() {
        this.newsletterId = this.$route.params.id ?? null
    }

}
</script>

<style lang="scss" scoped></style>