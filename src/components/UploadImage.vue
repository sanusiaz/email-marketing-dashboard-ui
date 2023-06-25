<template>
    <img v-if="previewImage || this.defaultImage"
        :src="( previewImage ) ? previewImage : this.defaultImage" alt="Profile Pics Image"
        class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 h-[150px] w-[150px]"
        style="left: calc(50% - 30px / 2);">

    <span class="update_pics absolute" style="left: calc(50% - 60px / 2); bottom: -110px;">
        <input type="file"  accept="image/*" ref="file" @change="selectImage" id="profile_pics" class="hidden">
        <label title="Select Your Profile Pics" for="profile_pics" :disabled="!currentImage" 
            class="h-[60px] p-3 w-[60px] flex align-center justify-center rounded-full bg-slate-100 cursor-pointer hover:bg-blue-700 transition-all duration-200 hover:duration-200 hover:text-white text-slate-700 shadow-lg"
            style="box-shadow: -1px 0px 17px 7px rgb(165 160 160 / 60%);">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
            </svg>
        </label>
    </span>

    <!-- Image Upload Progress Bar -->
    <div v-if="currentImage && progress > 0" class="progress">
        <div class="flex flex-row space-x-3 px-3 bg-green-600 py-1 justify-end relative" role="progressbar" :aria-valuenow="progress" aria-valuemin="0"
            aria-valuemax="100" :style="{ width: progress + '%' }">
            {{ progress }} <span>%</span>
        </div>
    </div>

    <!-- Image Message -->
    <PopupMessageComponent :popupMessage="this.message" :statusText="this.statusText"
        v-if="this.message !== ''" />

</template>

<script>
import UploadService from "../services/UploadFilesService"

import PopupMessageComponent from './PopupMessageComponent.vue'


export default {
    name: "UploadImage",

    props: {
        defaultImage: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentImage: undefined,
            previewImage: undefined,

            progress: 0,
            message: "",

            imageInfos: [],
            statusText: ''
        };
    },

    mounted() {
        UploadService.getFiles().then(response => {
            this.imageInfos = response.data;
        });
    },
    methods: {
        selectImage() {
            this.currentImage = this.$refs.file.files.item(0);
            this.previewImage = URL.createObjectURL(this.currentImage);
            this.progress = 0;
            this.message = this.statusText = "";


            // Call The Upload Function
            this.upload();
        },

        upload() {
            this.progress = 0;

            UploadService.upload(this.currentImage, (event) => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            })
                .then((response) => {
                    this.message = ( response.status === 201 ) ? 'Updated. Refreshing Page Please wait...' : response.data.message;
                    this.statusText = ( response.status === 201 ) ? 'success' : 'error'

                    setTimeout(() => {
                        this.progress = 0

                        // refresh current page 
                        this.$router.go()	// Refreshes page
                    }, 6000)


                    return UploadService.getFiles();
                })
                .then((images) => {
                    this.imageInfos = images.data;
                })
                .catch((err) => {
                    this.progress = 0;
                    this.statusText = 'error'
                    this.message = "Could not upload the image! " + err;
                    this.currentImage = undefined;
                });
        },
    },

    components: {PopupMessageComponent}
};
</script>

<style scoped>
    .progress {
        position: fixed;
    top: 20px;
    z-index: 999999;
    width: 100%;
    left: 0px;
    text-align: center;
    display: flex;
    background: white;
    color: white;
    margin: 0;
    top: 0px;
    border-bottom: 2px solid gray;
    }
</style>