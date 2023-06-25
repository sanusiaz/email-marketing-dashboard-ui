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

            <ButtonComponent @click.prevent="submitForm()" type="submit"
                class="px-5 hover:border-blue-600 mt-3 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                Set Message</ButtonComponent>

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

export default {
    name: 'WelcomeEmailComponent',
    data() {
        return {
            formData: {
                message: '',
                subject: ''
            },
        }
    },
    props: {
        templates: {
            type: Array
        },
        title: {
            type: String,
            default: 'Default Welcome Email'
        }
    },

    methods: {
        async submitForm() {
            this.$emit('getMessage', '')
            this.$emit('getStatusText', '')
            try {
                let __response = await axios.post('/subscribers/welcome', this.formData)
                console.log(__response)
                if (__response.status === 201) {
                    this.$emit('getMessage', __response.data.message)
                    this.$emit('getStatusText', 'success')
                }
                else {
                    this.$emit('getMessage', 'Internal Server Error')
                    this.$emit('getStatusText', 'error')
                }

            } catch (error) {
                if (error.response.data.message !== undefined && error.response.data.message !== "") {
                    this.$emit('getMessage', error.response.data.message)
                }
                else {
                    this.$emit('getMessage', 'Internal Server Error')
                }
                console.error(error.response.data.message)
                this.$emit('getStatusText', 'error')
            }
        },

        initTinyMce() {
            // TINYMCE INIT
            tinymce.remove();

            var component = this.formData;
            // Tiny MCE Free Init 
            tinymce.init({
                selector: 'textarea#message',
                target: this.$el,
                init_instance_callback: function (editor) {
                    editor.setContent(component.message)
                    editor.on('Change KeyUp Undo Redo', function (e) {
                        component.message = editor.getContent();
                    });
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
        }
    },
    components: { FormComponent, ButtonComponent, PopupMessageComponent },
    async mounted() {

        this.$emit('getTitle', this.title)
        this.$emit('getMessage', '')
        this.$emit('getStatusText', '')
        // load default new subscirber message
        try {
            let __response = await axios.get('/subscribers/welcome');
            if (__response.status === 200) {

                if (__response.data.data !== null) {
                    this.formData.subject = __response.data.data.subject;
                    this.formData.message = __response.data.data.message;
                    this.$emit('getMessage', __response.data.message)
                    this.$emit('getStatusText', 'success')
                    
                    tinymce.remove();
                    this.initTinyMce()

                    console.log(this.formData)
                }
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