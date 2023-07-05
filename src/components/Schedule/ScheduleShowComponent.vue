<template>
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-2xl font-Poppins font-semibold hidden">Showing Schedule Mail Here </h2>

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
                        <textarea name="recipients" id="recipients" v-model="this.scheduleInfo.recipients" col="30" rows="5"
                            class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                            placeholder="Seperate each address with a (,)"></textarea>
                    </label>


                    <label v-if="this.emailLists !== null && this.emailToggle === 'lists'" for="lists"
                        class="flex flex-col space-y-3 w-full">
                        <span class="text-sm font-semibold text-left font-Poppins">Select Email Lists / Folder: </span>

                        <select v-model="this.scheduleInfo.lists"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400" name="lists" id="lists"
                            placeholder="Select Email Lists / Folder">
                            <option v-for="emails in emailLists" :value="emails.folderRef" class="capitalize">{{ emails.name
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


                    <!-- Option to import Template -->

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
                            <span class="block ">Uploaded Files: </span>
                            <a target="_blank"
                                class="block font-normal font-Inter mb-1 underline hover:text-blue-700 cursor-pointer relative flex-wrap whitespace-nowrap"
                                v-for="(files, index) in this.scheduleInfo.attachments" :key="index" :href="files">{{ files
                                }}</a>
                        </span>
                        <input type="file" ref="file" @change="uploadFile" multiple name="attachments" id="attachments"
                            class="rounded-md w-full bg-white p-3 text-sm placeholder:text-gray-400"
                            placeholder="Pick Files to attach to mail">
                    </div>

                    <!-- Submit Button -->

                    <button @click.prevent="submitForm()" type="submit"
                        class="text-sm bg-blue-700 w-max rounded-md duration-200 hover:duration-200 hover:bg-slate-700 font-Inter font-semibold text-white text-center p-3 px-5">
                        <span>Send</span>

                    </button>
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
export default {
    name: 'ScheduleShowComponent',
    data() {
        return {
            scheduleId: null,
            statusText: '',
            popupMessage: '',
            scheduleInfo: {}
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
        }
    },

    watch: {
        async emailToggle(value) {
            this.scheduleInfo.sendTo = value

            this.scheduleInfo.lists = '';
            this.scheduleInfo.newsletter = '';
            this.scheduleInfo.subscribers = '';
            this.scheduleInfo.recipients = '';

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
    components: { PopupMessageComponent, FormComponent },
    async created() {
        this.scheduleId = this.$route.params.id;
        // Load Subscribers Data 
        try {
            let __response = await axios.get('/schedule/' + this.scheduleId)
            if (__response.status === 200) {
                this.scheduleInfo = __response.data.data
                console.log(this.scheduleInfo.message)
                this.tinymceInit()

            }
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="scss" scoped></style>