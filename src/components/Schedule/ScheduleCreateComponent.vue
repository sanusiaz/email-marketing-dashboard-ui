<template>
    <FormComponent enctype="multipart-form-data">
        <template v-slot:main_form>

            <div class="flex flex-col space-y-6 p-2 py-5 pb-0">
                <div class="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2">
                    <!-- Subject -->
                    <label for="subject" class="flex flex-col w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Subject: </span>
                        <input type="text" name="subject" id="subject"
                        v-model="this.formData.subject"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Subject">
                    </label>

                    <!-- Send to -->
                    <label for="recipients" class="flex flex-col space-y-3 w-full">
                        <span class="text-sm font-semibold text-left font-Poppins">Send to: </span>

                        <select v-model="this.emailToggle" class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            name="recipients" id="recipients">

                            <option value="" disabled selected>Select Where to send mail</option>
                            <option value="recipients">Email Addresse(s)</option>
                            <option value="lists">Email Lists / Folder</option>
                            <option value="subscribers">All Subscribers</option>
                            <option value="newsletter">Newsletter</option>
                        </select>
                    </label>
                </div>

                

                <!-- Recipients Email Addresses -->
                <label v-if="this.emailToggle === 'recipients'" for="recipients" class="flex flex-col w-full space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Enter Recipient(s) Email Address: </span>
                    <textarea name="recipients" id="recipients"
                    v-model="this.formData.recipients"
                        col="30" rows="5"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Seperate each address with a (,)"></textarea>
                </label>
                

                <label v-if="this.emailLists !== null && this.emailToggle === 'lists'" for="lists" class="flex flex-col space-y-3 w-full">
                    <span class="text-sm font-semibold text-left font-Poppins">Select Email Lists / Folder: </span>

                    <select v-model="this.formData.lists" class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                        name="lists" id="lists" placeholder="Select Email Lists / Folder">
                        <option v-for="emails in emailLists" :value="emails.folderRef" class="capitalize">{{ emails.name }}</option>
                    </select>
                </label>
                

                <!-- Schedule Information -->
                <div class="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2">
                    <!-- Date -->
                    <label for="scheduled_date" class="flex w-full flex-col space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Scheduled Date: </span>
                        <input type="date" name="scheduled_date" id="scheduled_date"
                        v-model="this.formData.scheduledDate"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Scheduled Date">
                    </label>

                    <!-- Time -->
                    <label for="scheduled_date" class="flex flex-col w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Scheduled Time: </span>
                        <input type="time" name="scheduled_date" id="scheduled_date"
                        v-model="this.formData.scheduledTime"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Scheduled Date">
                    </label>
                </div>


                <!-- Option to import Template -->

                <!-- Message -->
                <label for="message" class="flex flex-col w-full space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                    <textarea 
                        v-model="this.formData.message"
                        name="message" id="message"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Enter Message Here"></textarea>
                </label>


                <!-- Attachments -->
                <label for="attachments" class="flex w-full flex-col space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Attachments: </span>
                    <input type="file" multiple name="attachments" id="attachments"
                        class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                        placeholder="Pick Files to attach to mail">
                </label>

                <!-- Submit Button -->

                <button @click.prevent="submitForm()" type="submit"
                    class="text-sm bg-blue-700 w-max rounded-md duration-200 hover:duration-200 hover:bg-slate-700 font-Inter font-semibold text-white text-center p-3 px-5">
                    <span>Send</span>

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
    name: "ScheduleCreateComponent",
    data() {
        return {
            emailToggle: '',
            emailLists: '',
            formData: {
                subject: '',
                sendTo: '',
                attachments: '',
                scheduledDate: '',
                scheduledTime: '',
                message: '',
                subscribers: '',
                newsletter: '',
                recipients: '',
                lists: ''
            }
        }
    },
    watch: {
        async emailToggle(value) {
            this.formData.sendTo = value
        
            this.formData.lists = '';
            this.formData.newsletter = '';
            this.formData.subscribers = '';
            this.formData.recipients = '';

            if ( value !== "" ) {
                switch (value) {
                    case 'lists':
                        if ( this.emailLists === '' ) {
                            await axios.get('/lists')
                            .then(res => {
                                this.emailLists = res.data.data
                            })
                        }

                        this.formData.lists = 'selected'
                    break;

                    case 'subscribers': 
                        this.formData.subscribers = 'selected'
                    break;
                    case 'newsletter':
                        this.formData.newsletter = 'selected'
                    break;
                
                    default:
                        break;
                }
            }
        }
    },

    methods: {
        async submitForm() {
            this.$emit('getMessage', '')
            this.$emit('getStatusText', '')
            await axios.post('/schedule/create', this.formData)
                .then(response => {
                    if ( response.status === 201 ) {                        
                        // empty all form data 
                        this.formData.subject = ''
                        this.formData.sendTo = ''
                        this.formData.attachments = ''
                        this.formData.scheduledDate = ''
                        this.formData.scheduledTime = ''
                        this.formData.message = ''
                        this.formData.subscribers = ''
                        this.formData.newsletter = ''
                        this.formData.recipients = ''
                        this.formData.lists = ''

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
    mounted() {
         // Tiny MCE Free Init 
         tinymce.init({
            selector: 'textarea#sasa',
            height: 700,
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
        //     height: 700,
        //     image_caption: true,
        //     quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        //     noneditable_noneditable_class: "mceNonEditable",
        //     toolbar_mode: 'sliding',
        //     contextmenu: "link image imagetools table",
        // });
    },
}
</script>

<style lang="scss" scoped></style>