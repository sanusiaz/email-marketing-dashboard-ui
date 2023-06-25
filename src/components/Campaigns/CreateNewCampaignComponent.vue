<template>
    <FormComponent>
        <template v-slot:title>
            <h3 class="font-medium capitalize text-xl pt-4 pb-2">{{ text }}</h3>
            <hr>
        </template>

        <template v-slot:main_form>

            <!-- First Step  -->
            <div class="steps relative p-3" v-show="stepCount === 1" :stepCount="stepCount">

                <div class="flex flex-row space-x-2">
                    <InputComponent label="Campaign Name" name="campaign_name" placeholder="Enter Campaign Name" />

                    <!-- Select Campaign Type -->
                    <InputComponent label="Campaign Type" name="campaign_type" type="dropdown" :options="campaignTypeOptions" />
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
            <div class="steps relative p-3" v-show="stepCount === 2" :stepCount="stepCount">
                <span>Pick a template</span>
                
                <div class="overflow-y-auto max-h-[300px] mt-3 mb-2" data-simplebar data-simplebar-auto-hide="false"> 
                    <div class="grid grid-cols-2 gap-2 p-2 px-5 overflow-hidden">
                        <div v-for="template in templates" :key="template.id" @click="loadSelectedTemplate(template.id)" class="p-1 flex align-center justify-center cursor-pointer hover:border-blue-700 border-2 border-gray-200 rounded">
                            <img :src="image" alt="Template">
                        </div>
                    </div>
                </div>

                <div class="flex py-3 w-full justify-between">
                    <!-- Prev -->
                    <span
                        @click="this.stepCount = this.stepCount - 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                        </svg>
                    </span>
                    <!-- Next Button -->
                    <span
                        @click="this.stepCount = this.stepCount + 1"
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
            <div class="steps relative p-3" v-show="stepCount === 3" :stepCount="stepCount">
                
                <div class="overflow-y-auto max-h-[300px] mt-3 mb-2" data-simplebar data-simplebar-auto-hide="false"> 
                    

                    <label for="message" class="py-3 flex flex-col  px-0">
                        <span class="font-normal text-left font-Outfit py-2">Message</span>

                        <textarea id="editor" @change="console.log(selectedTemplateContent)" v-model="selectedTemplateContent" class="">{{ selectedTemplateContent }}</textarea>
                    </label>
                </div>

                <div class="flex py-3 w-full justify-between">
                    <!-- Prev -->
                    <span
                        @click="this.stepCount = this.stepCount - 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                        </svg>
                    </span>
                    <!-- Next Button -->
                    <span
                        @click="this.stepCount = this.stepCount + 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
                        </svg>
                    </span>
                </div>

            </div>

            <!-- Forth Step -->
            <div class="steps relative p-3" v-show="stepCount === 4" :stepCount="stepCount">
                <span class="font-Inter underline">Send to:</span>             
                
                <div class="overflow-y-auto max-h-[300px] mt-3 mb-2 px-3 pr-4" data-simplebar data-simplebar-auto-hide="false">
                    <!-- Select Email Lists Folder  -->
                    <InputComponent v-if="this.campaignIsForRecipients === false" label="Email Lists Folder" name="emai_lists" type="dropdown" :options="emailListsFolders" />
    
                    <!-- Recipients Emails -->
                    <label v-if="this.campaignIsForRecipients === true" for="message" class="py-3 flex flex-col  px-0">
                        <span class="font-normal text-left font-Outfit py-2">Recipients Emails</span>
                        <!-- Show Mesage Box to enter email message -->
                        <textarea class="text-sm w-full block relative outline-none border border-gray-400 p-3 rounded focus:ring-1 focus-ring-slate-200" name="recipients" id="recipients" cols="30" rows="10" placeholder="Enter Recipients email, seperate each with (,)"></textarea>
                    </label>
    
                    <span @click="this.campaignIsForRecipients = !this.campaignIsForRecipients" class="text-gray-500 py-4 cursor-pointer hover:text-gray-800 underline block">Or: {{ ( this.campaignIsForRecipients === false ) ? 'Recipients' : 'Email Lists' }}</span>  

                </div>

                <div class="flex py-3 w-full justify-between">
                    <!-- Prev -->
                    <span
                        @click="this.stepCount = this.stepCount - 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                        </svg>
                    </span>
                    <!-- Next Button -->
                    <span
                        @click="this.stepCount = this.stepCount + 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
                        </svg>
                    </span>
                </div>

            </div>

        </template>

        <template v-slot:button>
            <ButtonComponent v-if="stepsAreCompleted">Create</ButtonComponent>
        </template>
    </FormComponent>
</template>


<script>



import FormComponent from '../FormsComponents/FormComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import InputComponent from '../FormsComponents/InputComponent.vue'

import Image from '../../assets/img/template.jpeg'

// First Select all Campaign type
// Then Allow user to select template from the campaign campaignType
// Next step is for user to select the email folder or enter emails with , seperated values
//  //  Enter Campaign Name or leave for auto generated name
// // // Users can click to schedule this campaign instead
// // // Or Subject, Reply to email
// NB: Social media links will come from the profile, Logo same, Company Name Same

export default {
    name: 'CreateNewCampaignComponent',
    data() {
        return {
            formData: {
                name: '',
                campaignType: '',
                emails: '',
                emailFolderId: '',
                selectedTemplateId: '',
                bodyMessage: ''
            },
            text: 'Create a new Campaign',
            stepCount: 1,
            image: Image,
            stepsAreCompleted: false,
            campaignIsForRecipients: false,
            selectedTemplateContent: '<p>This Simple Paragraph</p>',
            campaignTypeOptions: [
                { id: 1, name: 'Promotional Campaign', value: 'Promotional' },
                { id: 2, name: 'Seasonal Campaign', value: 'Seasonal' },
                { id: 3, name: 'Welcome Email Campaign', value: 'Welcome' },
                { id: 4, name: 'Post Purchase Drip', value: 'Post Purchase Drip' },
                { id: 6, name: 'Invitation Emails', value: 'Invitation' },
                { id: 7, name: 'Discount Offers', value: 'Discount' },
                { id: 7, name: 'Discount Offers', value: 'Birthday' },
            ],  
            emailListsFolders: [
                {id: 1, name: 'Folder A', folderRef:'someuniquefolderref'},
                {id: 2, name: 'Folder B', folderRef:'someuniquefolderref'},
                {id: 3, name: 'Folder C', folderRef:'someuniquefolderref'},
                {id: 4, name: 'Folder D', folderRef:'someuniquefolderref'},
                {id: 5, name: 'Folder E', folderRef:'someuniquefolderref'},
                {id: 6, name: 'Folder F', folderRef:'someuniquefolderref'},
            ],

            templates: [
                { id: 1, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 2, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 3, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 4, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 5, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 6, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 7, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
                { id: 8, type: 'sometype', dataURI: 'LinkToGetTheFullHtmlData' },
            ]
        }
    },
    components: { FormComponent, InputComponent, ButtonComponent },

    methods: {
        loadSelectedTemplate(templateId) {
            alert('This is when we load selected template contents alongside Its Blade Parts where to change ' + templateId)
        }
    },
    mounted() {
        tinymce.remove();
        // Tiny MCE Free Init 
        tinymce.init({
            selector: 'textarea#editor',
            height: 520,
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
            entity_encoding : "html",
            oninit : "setPlainText",
            apply_source_formatting : true,
            images_upload_url: 'http://localhost/regno/image_processor.php',
            automatic_uploads: true,
            images_dataimg_filter: function(img) {
              return !img.hasAttribute('internal-blob');  // blocks the upload of <img> elements with the attribute "internal-blob".
            },
            file_picker_types: 'file image media',
            images_file_types: 'jpg,svg,webp,png,svg',
            allow_script_urls: true,
            convert_urls: false,
            extended_valid_elements:"style,link[href|rel]",
            custom_elements:"style,link,~link",
            verify_html: false,
            inline_styles : true

            // cleanup: true,
        });


        // tinymce.init({
        //     selector: 'textarea',
        //     plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        //     imagetools_cors_hosts: ['picsum.photos'],
        //     menubar: 'file edit view insert format tools table help',
        //     toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        //     toolbar_sticky: true,
        //     autosave_ask_before_unload: true,
        //     autosave_interval: "30s",
        //     autosave_prefix: "{path}{query}-{id}-",
        //     autosave_restore_when_empty: false,
        //     autosave_retention: "2m",
        //     image_advtab: true,
        //     content_css: '//www.tiny.cloud/css/codepen.min.css',
        //     link_list: [
        //         { title: 'My page 1', value: 'http://www.tinymce.com' },
        //         { title: 'My page 2', value: 'http://www.moxiecode.com' }
        //     ],
        //     image_list: [
        //         { title: 'My page 1', value: 'http://www.tinymce.com' },
        //         { title: 'My page 2', value: 'http://www.moxiecode.com' }
        //     ],
        //     image_class_list: [
        //         { title: 'None', value: '' },
        //         { title: 'Some class', value: 'class-name' }
        //     ],
        //     importcss_append: true,
        //     file_picker_callback: function (callback, value, meta) {
        //         /* Provide file and text for the link dialog */
        //         if (meta.filetype === 'file') {
        //         callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
        //         }

        //         /* Provide image and alt text for the image dialog */
        //         if (meta.filetype === 'image') {
        //         callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
        //         }

        //         /* Provide alternative source and posted for the media dialog */
        //         if (meta.filetype === 'media') {
        //         callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
        //         }
        //     },
        //     templates: [
        //             { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        //         { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        //         { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
        //     ],
        //     template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        //     template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        //     height: 520,
        //     image_caption: true,
        //     quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        //     noneditable_noneditable_class: "mceNonEditable",
        //     toolbar_mode: 'sliding',
        //     contextmenu: "link image imagetools table",
        // });

    },
}
</script>

<style lang="scss" scoped>
.tox.tox-tinymce {
    height: 500px !important;
}
.tox.tox-tinymce.tox-fullscreen {
    height: 100vh !important;
}
</style>