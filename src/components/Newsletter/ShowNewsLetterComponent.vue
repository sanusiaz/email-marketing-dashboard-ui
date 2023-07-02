<template>
     <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-2xl font-Poppins font-semibold">{{ title }}</h2>

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
                newsletterInfo: ''
            }
        },
        
        components: {ButtonComponent, PopupMessageComponent},

        mounted() {
           
        },

        methods: {

            // Update Campaign Message
            async submitForm() {

                this.statusText = this.popupMessage = ''
                this.processingForm = true
                try {
                    let __response = await axios.post(`/campaigns/${this.id}/message`, this.formData)

                    if ( __response.status === 201 ) {
                        console.log(__response.data)
                        this.statusText = 'success'
                        this.popupMessage = __response.message
                    }
                    else {
                        this.statusText = 'error'
                        this.popupMessage = 'An Error Occurred. Please Try Again'
                    }
                } catch( error ) {
                    console.error(error)
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== undefined
                    && error.request.response !== '') 
                    ? JSON.parse(error.request.response).message 
                    : 'Internal Server Error'
                    
                    this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                }
                this.processingForm = false
            },

            setNewsletterId() {
                this.id = this.$route.params.id
            },

            async getNewsletterInfo() {
                try {
                    let __response = await axios.get(`/newsletters/${this.id}`)

                    if ( __response.status === 200 ) {
                        this.newsletterInfo = __response.data.data
                        this.title  = `${this.newsletterInfo.name} Newsletter`
                    }
                    else {
                        this.statusText = 'error'
                        this.popupMessage = 'Internal Server Error'
                    }

                } catch( error ) {
                    this.statusText = 'error'
                    
                    if ( error.response.data.message !== undefined && error.response.data.message !== "" ) {
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
        },
        
    }
</script>

<style lang="scss" scoped>

</style>