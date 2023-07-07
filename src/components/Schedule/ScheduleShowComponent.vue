<template>
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-2xl font-Poppins font-semibold pb-5">Edit Schedule Info </h2>

        <router-link :to="{name: 'admin-schedule'}" class="font-semibold font-OpenSans py-2 relative w-max text-sm text-white bg-blue-600 rounded p-1 px-4 flex gap-2 align-middle items-center duration-200 hover:duration-200 hover:bg-white border border-blue-700 hover:shadow-md hover:text-blue-700 mb-3"><i class="fas fa-chevron-left"></i><span>Back</span></router-link>
      

        <FormComponent enctype="multipart-form-data">
            <template v-slot:main_form>

                <div class="flex flex-col space-y-6 p-2 py-5 pb-0">
                    <div class="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2">

                        <!-- Subject -->
                        <label for="subject" class="flex flex-col w-full space-y-3">
                            <span class="text-sm font-semibold text-left font-Poppins">Subject: </span>
                            <input type="text" name="subject" id="subject" v-model="this.scheduleInfo.subject"
                                class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                                placeholder="Subject">
                        </label>

                        <!-- Send to -->
                        <label  class="flex flex-col space-y-3 w-full">
                            <span class="text-sm font-semibold text-left font-Poppins">Sent to: <span class="font-normal text-gray-500 ">({{ this.scheduleInfo.sendTo }} )</span> </span>
                            <select v-model="this.scheduleInfo.sendTo"
                                class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                                @change="updateAction" >
                                <option >Select Where to send mail</option>
                                <option v-for="sendTo in sendToArray" :key="sendToArray.id" :value="sendTo.value" >{{ sendTo.name }}</option>
                            </select>
                        </label>
                    </div>

                    <!-- Recipients Email Addresses -->
                    <label v-if="this.scheduleInfo.sendTo === 'recipients'" for="recipients" class="flex flex-col w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Enter Recipient(s) Email Address: </span>
                        <textarea name="recipients" id="recipients" v-model="this.scheduleInfo.recipients" col="30" rows="5"
                            class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                            placeholder="Seperate each address with a (,)"></textarea>
                    </label>


                    <label v-if="this.scheduleInfo.sendTo === 'lists'" for="lists"
                        class="flex flex-col space-y-3 w-full">
                        <span class="text-sm font-semibold text-left font-Poppins">Selected Email Lists: <span class="font-normal text-gray-500 ">({{ this.scheduleInfo.emailListFolderName }} )</span> </span>

                        <select v-model="this.scheduleInfo.lists"
                        @change="updateEmailListsFolderName"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400" name="lists" id="lists"
                            placeholder="Select Email Lists / Folder">
                            <option v-for="emails in emailLists" :key="emails.id" :value="emails.folderRef" :selected="true" selected class="capitalize">{{ emails.name
                            }}
                            </option>
                        </select>
                    </label>


                    <!-- Schedule Information -->
                    <div class="grid grid-cols-1 gap-5 md:gap-20 md:grid-cols-2">
                        <!-- Date -->
                        <label for="scheduled_date" class="flex w-full flex-col space-y-3">
                            <span class="text-sm font-semibold text-left font-Poppins">Scheduled Date: </span>
                            <input type="date" name="scheduled_date" id="scheduled_date"
                                v-model="this.scheduleInfo.scheduledDate"
                                class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                                placeholder="Scheduled Date">
                        </label>

                        <!-- Time -->
                        <label for="scheduled_date" class="flex flex-col w-full space-y-3">
                            <span class="text-sm font-semibold text-left font-Poppins">Scheduled Time: </span>
                            <input type="time" name="scheduled_date" id="scheduled_date"
                                v-model="this.scheduleInfo.scheduledTime"
                                class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                                placeholder="Scheduled Date">
                        </label>
                    </div>

                    <!-- Message -->
                    <label for="message" class="flex flex-col w-full space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                        <textarea v-model="this.scheduleInfo.message" name="message" id="message"
                            class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                            placeholder="Enter Message Here"></textarea>
                    </label>


                    <!-- Attachments -->
                    <div class="flex w-full flex-col space-y-3">
                        <span class="text-sm font-semibold text-left font-Poppins">Attachments:
                            <span class="text-gray-600  font-normal" v-if="uploadedFiles === null">No Attachments</span>
                            <span v-else class="block ">Uploaded Files: </span>
                            <a target="_blank"
                                class="block font-normal font-Inter mb-1 underline hover:text-blue-700 cursor-pointer relative flex-wrap whitespace-nowrap"
                                v-for="(files, index) in uploadedFiles" :key="index" :href="files">{{ files
                                }}</a>
                        </span>
                        <input type="file" ref="file" @change="uploadFile" multiple name="attachments" id="attachments"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Pick Files to attach to mail">
                    </div>

                    <ButtonComponent class="text-sm cursor-pointer bg-blue-700 w-max rounded-md duration-200 hover:duration-200 hover:bg-slate-700 font-Inter font-semibold text-white text-center p-3 px-5" @click.prevent="submitForm()" type="submit">
                        <div class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-full h-full relative top-0 left-0 right-0">
                            <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> {{  ( this.processingForm  ) ? 'Processing' : 'Update'  }}
                        </div>
                    </ButtonComponent>
                </div>
            </template>
        </FormComponent>
    </div>



    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>
import axios from 'axios'
import PopupMessageComponent from '@/components/PopupMessageComponent.vue'
import FormComponent from '@/components/FormsComponents/FormComponent.vue'

// Button Component
import ButtonComponent from '@/components/Auth/ButtonComponent.vue'
export default {
    name: 'ScheduleShowComponent',
    data() {
        return {
            scheduleId: null,
            statusText: '',
            popupMessage: '',
            scheduleInfo: {},
            processingForm: false,
            emailToggle: '',
            emailLists: '',
            sendToArray: [
                {id: 1, name: 'Recipients', value: 'recipients'},
                {id: 2, name: 'Subscribers', value: 'subscribers'},
                {id: 3, name: 'Email Lists / Folder', value: 'lists'},
                {id: 4, name: 'Newsletter', value: 'newsletter'},
            ],
            selectedSendTo: 1,
            uploadedFiles: []
        }
    },

    methods: {
        tinymceInit() {
            tinymce.remove();

            var component = this.scheduleInfo;
            // Tiny MCE Free Init 
            tinymce.init({
                selector: 'textarea#message',
                target: this.$el,
                init_instance_callback: function (editor) {
                    editor.on('Change KeyUp Undo Redo', function (e) {
                        component.message = editor.getContent();
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
        },

        updateAction(value) {
            let __selectedAction = value.target.value
            this.scheduleInfo.lists = null
            this.scheduleInfo.newsletter = null
            this.scheduleInfo.subscribers = null
            this.scheduleInfo.recipients = null

            if ( __selectedAction === 'selected' ) {
                this.scheduleInfo.subscribers = 'selected'
            }
        },

        updateEmailListsFolderName(value) {
            let __folderRef = value.target.value
            let __selectedFolderName = this.emailLists.find(__element => {
                return __element.folderRef === __folderRef
            })

            this.scheduleInfo.emailListFolderName = __selectedFolderName.name
        },

        async submitForm() {
            this.processingForm = true
            this.popupMessage = ''
            this.statusText = ''
            console.log(this.scheduleInfo.attachments)
  
            await axios.post(`/schedule/${this.scheduleId}`, this.scheduleInfo, {
                'Content-type': 'multipart/form-data'
            })
                .then(response => {
                    console.log(response)
                    if ( response.status === 201 ) {
                        this.popupMessage = response.data.message
                        this.statusText = 'success'
                    }
                    this.processingForm = false
                })
                .catch(error => {
                    this.processingForm = false
                    this.statusText = 'error'

                    if ( error.response.data.message !== undefined 
                        && error.response.data.message !== '' ) {
                        this.popupMessage = error.response.data.message
                    }
                    else {
                        this.popupMessage = 'Internal Server Error'
                    }
                })
        },

        uploadFile() {
            this.scheduleInfo.attachments = this.$refs.file.files
        }
    },

    watch: {
        async emailToggle(value) {
            this.scheduleInfo.sendTo = value

            this.scheduleInfo.lists = null;
            this.scheduleInfo.newsletter = '';
            this.scheduleInfo.subscribers = null;
            this.scheduleInfo.recipients = null;
            this.scheduleInfo.emailListFolderName = ''

            if (value !== "") {
                switch (value) {
                    case 'lists':
                        if (this.emailLists === '') {
                            await axios.get('/lists')
                                .then(res => {
                                    this.emailLists = res.data.data
                                })
                        }

                        this.scheduleInfo.lists = 'selected'
                        break;

                    case 'subscribers':
                        this.scheduleInfo.subscribers = 'selected'
                        break;
                    case 'newsletter':
                        this.scheduleInfo.newsletter = 'selected'
                        break;

                    default:
                        break;
                }
            }
        }
    },
    components: { PopupMessageComponent, FormComponent, ButtonComponent },

    async created() {
        this.scheduleId = this.$route.params.id;
        // Load Subscribers Data 
        try {
            let __response = await axios.get('/schedule/' + this.scheduleId)
            if (__response.status === 200) {
                this.scheduleInfo = __response.data.data
                this.uploadedFiles = this.scheduleInfo.attachments

                if ( this.scheduleInfo.sendTo !== undefined ) {
                    let __savedSentToVal = this.scheduleInfo.sendTo
                    this.selectedSendTo = this.sendToArray.filter(__element => {
                        return __element.value === __savedSentToVal
                    })
                    
                    this.selectedSendTo = parseInt(this.selectedSendTo[0].id)
                }
                

                // set email toggle 
                this.emailToggle = this.scheduleInfo.sendTo

                // Inistalize tinmce plugin
                this.tinymceInit()

            }
        } catch (error) {
            if ( error.response.status === 404 ) {
                this.popupMessage = 'No Record Found'
                this.statusText = 'error'

                setTimeout( () => {
                    this.$router.go(-1)
                }, 5000 )
            }
            console.error(error)
        }
    }
}
</script>

<style lang="scss" scoped></style>