<template>
    <div class="main_contents pt-32 px-10">

        <router-link :to="{ name: 'admin-newsletter' }"
            class="font-semibold font-OpenSans py-2 relative w-max text-sm text-white bg-blue-600 rounded p-1 px-4 flex gap-2 align-middle items-center duration-200 hover:duration-200 hover:bg-white border border-blue-700 hover:shadow-md hover:text-blue-700 mb-3">
            <i class="fas fa-chevron-left"></i>
            <span>Back</span>
        </router-link>

    
        <h2 class="text-black text-2xl font-Poppins font-semibold hidden">{{ title }}</h2>


        <!-- Main Contents -->
        <section class="main py-4 pt-6 flex flex-col gap-3">
            <div class="grid md:grid-cols-2 gap-10">
                <div class="border border-gray-300 rounded-md p-3">
                    <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Name: &nbsp;</span>
                    <span class="font-Barlow">{{ this.newsletterInfo.name }}</span>
                </div>


                <div class="border border-gray-300 rounded-md p-3">
                    <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Subject: &nbsp;</span>
                    <span class="font-Barlow">{{ this.newsletterInfo.subject }}</span>
                </div>
            </div>

            <div v-if="this.newsletterInfo.recipients !== null && this.newsletterInfo.recipients !== '' && this.newsletterInfo.recipients !== undefined " class="border border-gray-300 rounded-md p-3">
                <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Recipients Email Address: &nbsp;</span>
                <span v-if="this.newsletterInfo.recipients !== null && this.newsletterInfo.recipients !== '' && this.newsletterInfo.recipients !== undefined " class="block relative">
                    <span class="font-Barlow" v-html="this.newsletterInfo.recipients.join(', ')"></span>
                </span>
            </div>

            <div v-if="this.newsletterInfo.lists !== null" class="border border-gray-300 rounded-md p-3">
                <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Lists: &nbsp;</span>
                <span class="font-Barlow">{{ this.newsletterInfo.lists }}</span>
            </div>

            <div class="grid md:grid-cols-2 gap-10">
                <div class="border border-gray-300 rounded-md p-3">
                    <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Sent to: &nbsp;</span>
                    <span class="font-Barlow">{{ this.newsletterInfo.sentTo }}</span>
                </div>

                <div class="border border-gray-300 rounded-md p-3">
                    <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Status: &nbsp;</span>
                    <span class="text-slate-500 font-Barlow">{{ this.newsletterInfo.status }}</span>
                </div>
            </div>


            <!-- Message -->
            <div class="border border-gray-300 rounded-md p-3">
                <span class="font-semibold mb-1 text-sm text-gray-700 pr-2 block pb-3">Message: &nbsp;</span>
                <router-link title="Click to view message" class="font-normal text-sm font-Poppins text-white bg-yellow-700 hover:bg-transparent hover:duration-200 duration-200 w-max flex gap-2 align-middle items-center border border-yellow-700 hover:text-yellow-700 hover:shadow-md p-2 px-4 rounded-md" :to="{name:'admin-newsletter-message', params: {id: this.newsletterInfo.id}}">
                    <i class="fas fa-external-link-alt"></i>
                    <span>View Message</span>
                </router-link>
            </div>

            <!-- Attachment -->
            <div class="border border-gray-300 rounded-md p-3">
                <span class="font-semibold mb-1 text-sm text-gray-700 pr-2">Attachments: &nbsp;</span>
                <a v-if="this.newsletterInfo.attachmentURL !== null" :href="this.newsletterInfo.attachmentURL" class="text-slate-500 font-Barlow" id="message">{{ this.newsletterInfo.attachmentURL }}</a>

                <span class="text-slate-500 font-Barlow" v-else>No Attachments</span>
            </div>

            <!-- Edit Button -->
            <router-link class="text-center w-max bg-blue-700 text-white font-normal font-Poppins p-2 duration-200 hover:underline hover:bg-white hover:duration-200 hover:text-blue-700 border border-transparent hover:border-blue-700 hover:shadow-md block mt-3 rounded px-5" :to="{name: 'admin-newsletter-update', params: {id: this.newsletterInfo.id}}">Edit Newsletter</router-link>

        </section>

    </div>


    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>

import axios from 'axios'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import PopupMessageComponent from '../PopupMessageComponent.vue'

export default {
    name: 'ShowNewsLetterComponent',
    data() {
        return {
            formData: {
                message: ''
            },
            processingForm: false,
            statusText: '',
            popupMessage: '',
            id: null,
            title: '',
            newsletterInfo: {}
        }
    },

    components: { ButtonComponent, PopupMessageComponent },

    mounted() {

    },

    methods: {

        // Update Campaign Message
        async submitForm() {

            this.statusText = this.popupMessage = ''
            this.processingForm = true
            try {
                let __response = await axios.post(`/campaigns/${this.id}/message`, this.formData)

                if (__response.status === 201) {
                    console.log(__response.data)
                    this.statusText = 'success'
                    this.popupMessage = __response.message
                }
                else {
                    this.statusText = 'error'
                    this.popupMessage = 'An Error Occurred. Please Try Again'
                }
            } catch (error) {
                console.error(error)
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== undefined
                    && error.request.response !== '')
                    ? JSON.parse(error.request.response).message
                    : 'Internal Server Error'

                this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message
            }
            this.processingForm = false
        },

        setNewsletterId() {
            this.id = this.$route.params.id
        },

        async getNewsletterInfo() {
            try {
                let __response = await axios.get(`/newsletters/${this.id}`)

                if (__response.status === 200) {
                    this.newsletterInfo = __response.data.data
                    this.title = `${this.newsletterInfo.name} Newsletter`
                    if ( __response.data.message !== undefined ) {

                        this.newsletterInfo.message = __response.data.message
                        console.log(__response)
                    }
                    console.log(__response.data)
                }
                else {
                    this.statusText = 'error'
                    this.popupMessage = 'Internal Server Error'
                }

            } catch (error) {
                this.statusText = 'error'

                if (error.response.data.message !== undefined && error.response.data.message !== "") {
                    this.popupMessage = error.response.data.message
                    this.title = this.popupMessage
                }
                else {
                    this.popupMessage = 'Internal Server Error'
                }

            }
        },


        // Inistalize TinyMCE
        initTinyMce() {
            tinymce.remove()

            var component = this.formData;
            // Tiny MCE Free Init 
            tinymce.init({
                selector: 'textarea#message',
                target: this.$el,
                init_instance_callback: function (editor) {
                    editor.on('Change KeyUp Undo Redo', function (e) {
                        component.message = editor.getContent();
                    });
                    // component.objTinymce = editor;
                    editor.setContent(component.message)
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
    },

    async mounted() {

        this.initTinyMce()
        this.setNewsletterId()

        // get newsletter message
        this.getNewsletterInfo()
    }

}
</script>

<style lang="scss" scoped></style>