<template>
    <form @submit.prevent="submitForm()" class="py-3">
        <span class="font-medium text-xl text-center font-Poppins">Campaign Message</span>
        <hr class="my-2">

        <small>Please Note: Changing this message will only update message for new processes. All Sent/Queued Message cannot be changed.</small>

        <!-- Message Area -->
        <div class="overflow-y-auto max-h-[300px] mt-3 mb-2" data-simplebar data-simplebar-auto-hide="false"> 
            <label for="message" class="flex flex-col mb-3 w-full space-y-3 pr-4">
                <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                <textarea style="height: 500px;" v-model="this.formData.message" name="message" id="message"
                    class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                    placeholder="Enter Message Here">{{ this.formData.message }}</textarea>
            </label>
        </div>
        <!-- Edit Button -->
        <ButtonComponent @click.prevent="submit()" type="submit"
            class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">Update Message</ButtonComponent>
    </form>
</template>

<script>

    import axios from 'axios'
    import ButtonComponent from '../Auth/ButtonComponent.vue'
    export default {
        name: 'viewMessageComponent',
        data() {
            return {
                formData: {
                    message: ''
                }
            }
        },

        props: {
            id: {
                default: null
            }
        },
        
        components: {ButtonComponent},

        methods: {
            async submitForm() {
                try {

                } catch( error ) {
                    console.error(error)
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

            // get campaign message
            this.popupMessage = this.statusText = ''
            if ( this.id !== "" && this.id !== undefined ) {
                try {
                    let __response = await axios.get(`/campaigns/${this.id}/message`)

                    if ( __response.status === 200 && __response.statusText !== 'error' ) {
                        console.log(__response)

                        this.formData.message = __response.data.data;
                        this.initTinyMce()
                    }
                    else {
                        this.statusText = 'error'
                        this.popupMessage = 'Cannot Get Message At The Moment'
                    }
                }catch( error ) {
                    console.error(error)
                }
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>