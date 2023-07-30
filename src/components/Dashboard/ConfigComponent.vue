<template>
    <div
        class="relative bg-white p-2 m-auto h-max px-4 rounded min-w-[300px] max-w-[300px] sm:min-w-[500px] sm:max-w-[500px]">
        <h3 class="font-medium capitalize text-lg pt-4 pb-2">Email Config's &nbsp;
            <span v-if="!this.addNewSmtp && this.emailConfigs.length > 0" @click="addSmtp"
                class="font-medium text-white rounded bg-blue-700 border border-blue-700 text-sm hover:text-blue-700 hover:bg-white cursor-pointer transition-all duration-200 hover:duration-200 p-2 font-Inter">Add
                New Smtp</span>
            <span v-if="this.addNewSmtp" @click="this.addNewSmtp = !this.addNewSmtp"
                class="font-medium text-white rounded bg-blue-700 border border-blue-700 text-sm hover:text-blue-700 hover:bg-white cursor-pointer transition-all duration-200 hover:duration-200 p-2 font-Inter">View
                All Smtp</span>
        </h3>

        <hr>

        <div data-simplebar class="overflow-y-auto max-h-[300px] bg-gray-100 px-3 mt-3 mb-2"
            data-simplebar-auto-hide="false">
            <div class="flex flex-col py-5 space-y-3">
                <span v-if="!this.addNewSmtp && this.emailConfigs.length > 0" @click="this.activeConfig = 0"
                    class="underline cursor-pointer text-gray-500 text-sm">Fold All</span>
                <!-- List all email configs -->
                <div v-if="!this.addNewSmtp" v-for="(config, index) in this.emailConfigs" :key="config.id">
                    <div @click="this.activeConfig = config.id" :id="config.id"
                        class="relative items-center justify-between flex flex-col p-2 px-4 gap-2 group transition-all duration-200 hover:duration-200 cursor-pointer hover:bg-stone-300 hover:text-white bg-white w-full rounded mr-3">
                        <div class="flex justify-between items-center align-middle gap-2 w-full ">
                            <span
                                class="flex-none p-1 rounded border-full border border-gray-300 h-[18px] w-[18px] flex align-middle items-center justify-center text-xs">{{
                                    index + 1 }}</span>
                            <div class="flex flex-col flex-auto">
                                <b class="font-medium text-gray-700">{{ config.mailServer }}</b>
                                <span class="text-gray-500 text-sm font-normal">{{ config.username }}</span>
                            </div>

                            <!-- Expand Button -->
                            <span class="flex-none p-1 h-max"
                                :class="(activeConfig === config.id) ? 'rotate-180 duration-500 transition-all' : ''">
                                <svg class="w-[20px] h-[20px]" fill="none" stroke="currentColor" stroke-width="1.5"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5">
                                    </path>
                                </svg>
                            </span>
                        </div>

                        <div :class="(this.activeConfig === config.id) ? 'block' : 'hidden'"
                            class="border-t w-full pt-5 px-0 border-gray-400 p-2">
                            <CreateConfigComponent @getInputs="saveConfig"  :processingForm="this.processingForm" :config="config">
                            </CreateConfigComponent>
                        </div>

                    </div>
                </div>

                <div v-if="!isLoading && (this.addNewSmtp || this.emailConfigs.length < 1)">
                    <CreateConfigComponent @getInputs="saveConfig" :processingForm="this.processingForm"
                        :config="this.formData.config"></CreateConfigComponent>
                </div>
            </div>
        </div>

        <!-- Close Button -->
        <span @click="triggerButton"
            class="flex absolute top-3 right-2 cursor-pointer align-center justify-center">
            <svg fill="none" class="w-8 h-8" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </span>

    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
    </div>
</template>

<script>
import axios from 'axios'
import CreateConfigComponent from './CreateConfigComponent.vue'
import PopupMessageComponent from '../PopupMessageComponent.vue'


export default {
    name: 'ConfigComponent',
    data() {
        return {
            emailConfigs: [],
            activeConfig: 0,
            addNewSmtp: false,
            isLoading: true,
            popupMessage: '',
            statusText: '',
            processingForm: false,
            formData: {
                config: {
                    fromName: '',
                    fromEmail: '',
                    replyToEmail: '',
                    mailServer: '',
                    username: '',
                    password: '',
                    port: '',
                    encryption: '',
                    dailyLimits: ''
                }
            }
        }
    },
    watch: {
        activeConfig(value) {

            // filter selected config 
            if (value !== null && value !== "") {
                let __selectedConfig = this.emailConfigs.find((a) => {
                    return a.id === value
                })

                this.formData.config = __selectedConfig
            }
        }
    },
    methods: {
        triggerButton() {
            this.$emit('showComponent', false)
        },
        async saveConfig(value) {
            if (value !== "") {
                this.formData.config = value
                this.emailConfigs.push = this.formData.config
            }
            this.processingForm = true
            this.popupMessage  = this.statusText = ''
            await axios.post('/settings/config', this.formData.config)
                .then(response => {
                    this.statusText = 'success'
                    let serverSuccessMessage = response.data.message
                    this.popupMessage = (serverSuccessMessage !== undefined) ? serverSuccessMessage : 'Updated Successfully'
                    this.processingForm = false
                    setTimeout(() => {
                        this.$emit('showComponent', false)
                    }, 4000);

                }).catch(error => {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.response.data.message !== "" && error.response.data.message !== undefined) ? error.response.data.message : 'Internal Server Error'
                    this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : 'Error: Please Contact Site Admin'

                    this.processingForm = false
                })
        },
        addSmtp() {
            this.activeConfig = 0
            this.addNewSmtp = true
        },
        async getAllConfigs() {
            await axios.get('/settings?smtpInfo=true')
                .then((response) => {
                    if (response.data !== "" && response.status === 200 && response.statusText !== 'error') {
                        if (response.data.smtpInfo !== null) {
                            if (Array.isArray(response.data.smtpInfo)) {
                                let __emailConfigs = this.emailConfigs;

                                response.data.smtpInfo.forEach(function (__element) {
                                    __emailConfigs.push({
                                        'id': __element.id,
                                        'fromName': __element.fromName,
                                        'fromEmail': __element.fromEmail,
                                        'replyToEmail': __element.replyToEmail,
                                        'mailServer': __element.mailServer,
                                        'port': __element.port,
                                        'encryption': __element.encryption,
                                        'username': __element.username,
                                        'password': __element.password,
                                        'dailyLimits': __element.dailyLimits,
                                    });
                                });

                                this.emailConfigs = __emailConfigs;
                            }
                        }

                        this.isLoading = false
                    }
                })
                .catch((error) => {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== undefined && error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                    this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message

                    this.isLoading = false
                })
        }

    },
    created() {
        this.getAllConfigs()
    },
    components: { CreateConfigComponent, PopupMessageComponent }
}
</script>

<style lang="scss" scoped></style>