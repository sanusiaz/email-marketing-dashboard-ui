<template>
    <teleport to='#popup'>

        <div v-if="this.teleportedComponent !== ''" class="popup_container flex place-content-center place-items-center">
            <div class="relative bg-white p-2 px-4 rounded min-w-[300px] max-w-[300px] sm:min-w-[500px] sm:max-w-[500px]">
                <component @closeForm="triggerCloseForm" :is="this.teleportedComponent" :id="this.id"></component>

                <!-- Close Button -->
                <span @click="this.teleportedComponent = ''"
                    class="flex absolute top-3 right-2 cursor-pointer align-center justify-center">
                    <svg fill="none" class="w-8 h-8" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </span>
            </div>
        </div>

    </teleport>


    <FormComponent enctype="multipart-form-data">
        <template v-slot:main_form>


            <!-- First Step -->
            <div class="flex flex-col space-y-6 p-2 py-5 pb-0" v-show="stepCount === 1" :stepCount="stepCount">

                <div class="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2">
                    <!-- Subject -->
                    <label for="subject" class="flex flex-col w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Subject: </span>
                        <input type="text" name="subject" id="subject" v-model="this.formData.subject"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400" placeholder="Subject">
                    </label>

                    <!-- Send to -->
                    <label for="recipients" class="flex flex-col space-y-3 w-full">
                        <span class="text-sm font-semibold text-left font-Poppins">Send to: </span>

                        <select v-model="this.emailToggle"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400" name="recipients"
                            id="recipients">

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
                    <textarea name="recipients" id="recipients" v-model="this.formData.recipients" col="30" rows="5"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Seperate each address with a (,)"></textarea>
                </label>

                <label v-if="this.emailLists !== null && this.emailToggle === 'lists'" for="lists"
                    class="flex flex-col space-y-3 w-full">
                    <span class="text-sm font-semibold text-left font-Poppins">Select Email Lists / Folder: </span>

                    <select v-model="this.formData.lists"
                        class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400" name="lists" id="lists"
                        placeholder="Select Email Lists / Folder">
                        <option v-for="emails in emailLists" :value="emails.folderRef" class="capitalize">{{ emails.name }}
                        </option>
                    </select>
                </label>

                <!-- Schedule Information -->
                <div class="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2">
                    <!-- Date -->
                    <label for="scheduled_date" class="flex w-full flex-col space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Scheduled Date: </span>
                        <input type="date" name="scheduled_date" id="scheduled_date" v-model="this.formData.scheduledDate"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Scheduled Date">
                    </label>

                    <!-- Time -->
                    <label for="scheduled_date" class="flex flex-col w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Scheduled Time: </span>
                        <input type="time" name="scheduled_date" id="scheduled_date" v-model="this.formData.scheduledTime"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Scheduled Date">
                    </label>
                </div>

                <!-- Templates Selection  -->
                <div class="bg-white p-2 rounded-md border border-gray-200">
                    <span
                        class="p-2 py-4 border-b border-gray-700 block relative font-semibold capitalize font-Poppins">Pick
                        a template</span>

                    <div class=" overflow-y-auto max-h-[300px] mt-3 mb-2 p-3 sm:p-5 md:p-7 " data-simplebar
                        data-simplebar-auto-hide="false">
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 p-2 px-5 overflow-hidden">
                            <div v-for="template in templates" :key="template.id"
                                class="shadow-md p-2 hover:shadow-lg flex align-center justify-center group cursor-pointer hover:border-blue-700 border-2 border-gray-200 rounded relative"
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
                        <span></span>
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
            <div class="flex flex-col space-y-6 p-2 py-5 pb-0" v-show="stepCount === 2" :stepCount="stepCount">

                <!-- Message -->
                <label for="message" class="flex flex-col w-full space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                    <textarea v-model="this.formData.message" name="message" id="message"
                        class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                        placeholder="Enter Message Here"></textarea>
                </label>


                <!-- Attachments -->
                <label for="attachments" class="flex w-full flex-col space-y-3">
                    <span class="text-sm font-semibold text-left font-Poppins">Attachments: </span>
                    <input type="file" ref="file" @change="uploadFile" multiple name="attachments" id="attachments"
                        class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                        placeholder="Pick Files to attach to mail">
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

                    <!-- Submit Button -->
                    <button @click.prevent="submitForm()" type="submit"
                        class="text-sm bg-blue-700 w-max rounded-md duration-200 hover:duration-200 hover:bg-slate-700 font-Inter font-semibold text-white text-center p-3 px-5">
                        <span>Send</span>

                    </button>

                </div>
            </div>


        </template>
    </FormComponent>

     <!-- Popup Message -->
     <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>
import axios from 'axios'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
import FormComponent from '../FormsComponents/FormComponent.vue';
import PopupMessageComponent from '@/components/PopupMessageComponent.vue'


export default {
    name: "ScheduleCreateComponent",
    data() {
        return {
            emailToggle: '',
            emailLists: '',
            popupMessage: '',
            statusText: '',
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
            },
            stepCount: 1,
            teleportedComponent: '',
            templates: {}
        }
    },
    watch: {
        async emailToggle(value) {
            this.formData.sendTo = value

            this.formData.lists = '';
            this.formData.newsletter = '';
            this.formData.subscribers = '';
            this.formData.recipients = '';

            if (value !== "") {
                switch (value) {
                    case 'lists':
                        if (this.emailLists === '') {
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
        uploadFile() {
            // Allow Multiple file upload
            this.formData.attachments = this.$refs.file.files
        },

        // Get all newsletter templates 
        async getAllTemplate() {
            let __response = await axios.get('/templates/all')
            if (__response.status === 200) {
                this.templates = __response.data.data                
            }
        },

        // Get Selected Template Content and parse it to message box
        async setSelectedTemplate(template) {
            // This will clear out previous messages / template 
            this.formData.message = ''
            this.statusText = ''
            this.popupMessage = ''

            this.formData.template = template


            let __SelectedTemplate = this.templates.filter((e) => {
                return e.uuid === template
            })


            if (__SelectedTemplate[0].preview !== undefined) {
                this.popupMessage  = 'Parsing Templates Contents..'
                this.statusText = 'success'
                try {
                    let __contents = await axios.get(__SelectedTemplate[0].preview);
                    if (__contents.status === 200) {

                        this.formData.message = ''
                        this.formData.message = __contents.data
                        this.initTinyMce()

                        this.popupMessage  = 'Templates Has Been Selected.'
                        this.statusText = 'success'

                        this.stepCount = this.stepCount + 1;
                    }


                } catch (error) {
                    console.error(error)
                    error = JSON.parse(error.response.request.response)

                    this.popupMessage  = error.message
                    this.statusText = 'error'
                }
            }
            else {
                this.popupMessage  = 'No Preview found for this template'
                this.statusText = 'error'
            }




        },

        async submitForm() {
            this.popupMessage  = ''
            this.statusText = ''
            const headers = { 'Content-Type': 'multipart/form-data' }

            if (this.formData.attachments !== null) {
                if (this.formData.attachments.size > (1024 * 1000 * 50)) {
                    this.popupMessage  = 'File Must Not Be More Than 50mb.'
                    this.statusText = 'error'

                    return false;
                }
            }
            await axios.post('/schedule/create', this.formData, { headers })
                .then(response => {
                    if (response.status === 201) {
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

                        this.$emit('removeComponent', true)
                    }
                }).catch(error => {
                    this.popupMessage  = error.response.data.message
                    this.statusText = 'error'
                })
        },

        onInput: function (e) {
            this.$emit("update:modelValue", e.target.value);
        },

        initTinyMce() {
            tinymce.remove();
            tinymce.remove();

            var component = this.formData;
            // Tiny MCE Free Init 
            tinymce.init({
                selector: 'textarea#message',
                target: this.$el,
                init_instance_callback: function (editor) {
                    editor.on('Change KeyUp Undo Redo', function (e) {
                        // component.message = editor.getContent();
                    });
                    // component.objTinymce = editor;
                    if (component.message !== null && component.message !== '') {
                        editor.setContent(component.message)
                    }
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
    components: { FormComponent, PopupMessageComponent },
    mounted() {

        this.initTinyMce()
        this.getAllTemplate()
    },
}
</script>

<style lang="scss" scoped></style>