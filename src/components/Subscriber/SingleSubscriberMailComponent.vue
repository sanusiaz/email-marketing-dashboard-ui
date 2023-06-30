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
                                    <i @click="setSelectedTemplate(template.id)" title="Click To Select Template"
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
            <div class="steps relative p-3" v-show="stepCount === 3" :stepCount="stepCount">
                <!-- Message Box -->

                <label for="message" class="flex flex-col mb-3 w-full space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                    <textarea style="height: 500px;" v-model="this.formData.message" name="message" id="message"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Enter Message Here">{{ this.formData.message }}</textarea>
                </label>

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

                    <ButtonComponent @click.prevent="sendMessageToSubscriber()" type="submit"
                        class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                        Send Message</ButtonComponent>

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
            allTemplates: []
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
        initTinyMce() {
            tinymce.remove();
            this.formData.email = this.selectedEmail

            var component = this.formData;
            // Tiny MCE Free Init 
            tinymce.init({
                selector: 'textarea#message',
                target: this.$el,
                init_instance_callback: function (editor) {
                    editor.on('Change KeyUp Undo Redo', function (e) {
                        component.message = editor.getContent();
                    });

                    editor.setContent(component.message)
                    // component.objTinymce = editor;
                },
                height: '700px',
                width: '100%',
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste help wordcount autoresize'
                ],
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help | fullscreen | image | paste | file',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                statusbar: false,
                toolbar_items_size: 'small',
                element_format: 'html',
                encoding: "UTF-8",
                entity_encoding: "html",
                oninit: "setPlainText",
                apply_source_formatting: true,
                images_upload_url: 'http://localhost/regno/image_processor.php',
                automatic_uploads: true,
                images_dataimg_filter: function (img) {
                    return !img.hasAttribute('internal-blob');  // blocks the upload of <img> elements with the attribute "internal-blob".
                },
                file_picker_types: 'file image media',
                images_file_types: 'jpg,svg,webp,png,svg',
                allow_script_urls: true,
                convert_urls: false,
                extended_valid_elements: "style,link[href|rel]",
                custom_elements: "style,link,~link",
                verify_html: false,
                inline_styles: true,
                // setup: function(ed) {
                //     ed.on('change', function(e) {
                //         tinyMCE.triggerSave();
                //     });
                // },
                // cleanup: true,
            });
        },
        // Send Message to receivers email
        async sendMessageToSubscriber() {
            this.statusText = this.popupMessage = ''
            try {
                let __response = await axios.post('/subscribers/single/mail', this.formData)
                if (__response.status === 200) {
                    this.statusText = 'success'
                    this.popupMessage = __response.data.message

                    this.$emit('closeForm', true)
                }
                else {
                    this.statusText = 'error'
                    this.popupMessage = __response.data.message
                }

            } catch (error) {
                error = JSON.parse(error.response.request.response)
                this.statusText = 'error'
                this.popupMessage = error.message
            }
        },

        // Get Selected Template Content and parse it to message box
        async setSelectedTemplate(template) {
            // This will clear out previous messages / template 
            this.formData.message = ''
            
            this.formData.template = template

            this.statusText = this.popupMessage = ''

            let __SelectedTemplate = this.templates.filter((e) => {
                return e.id === template
            })


            if (__SelectedTemplate[0].preview !== undefined) {

                this.popupMessage = 'Parsing Templates Contents...'
                this.statusText = 'success'
                try {
                    let __contents = await axios.get(__SelectedTemplate[0].preview);
                    if (__contents.status === 200) {
                       
                        
                        this.formData.message = __contents.data
                        this.initTinyMce()
                        this.popupMessage = 'Template has been selected'
                        this.statusText = 'success'

                        this.stepCount = this.stepCount + 1;
                    }


                } catch (error) {
                    console.error(error)
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
    components: { FormComponent, ButtonComponent, PopupMessageComponent },
    mounted() {
        // this.initTinyMce()
    }
}
</script>

<style lang="scss" scoped></style>