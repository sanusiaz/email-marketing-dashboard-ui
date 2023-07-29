<template>
    <FormComponent v-if="!this.listIsCreated">
        <template v-slot:title>
            <h3 class="font-medium capitalize text-xl pt-4 pb-2">{{ text }}</h3>
            <hr>
        </template>

        <template v-slot:main_form>

            <!-- First Step  -->
            <div class="steps relative p-3" v-show="stepCount === 1" :stepCount="stepCount">

                <div class="flex flex-col space-x-2">
                    <InputComponent  @passData="getFolderName" label="Folder Name" name="folder_name"
                        placeholder="Enter Folder Name" />

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
                <span>Enter Email's</span>
                <small class="text-xs">( Seperate Email's with , )</small>

                <textarea placeholder="test@domain.com,
testanother@domain.com" v-model="formData.emailLists" name="email_lists"
                    class="text-gray-700 my-2 text-sm border border-gray-500 rounded-md w-full p-2" cols="30"
                    rows="10">{{ formData.emailLists }}</textarea>

                <div class="flex py-3 w-full justify-between">
                    <!-- Prev -->
                    <span v-if="this.requestType === 'create'" @click="this.stepCount = this.stepCount - 1"
                        class="h-12 cursor-pointer w-12 bg-blue-600 hover:text-blue-700 hover:shadow-lg text-white hover:bg-white border border-transparent hover:border-blue-600 transition-all duration-200 hover:duration-200 font-semibold p-3 rounded-full block relative hmax">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                        </svg>
                    </span>
                    <ButtonComponent @click.prevent="createOrUpdateListRequest()" type="submit"
                        class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                        {{ ( this.requestType === 'create' ) ? 'Create' : 'Update' }}</ButtonComponent>
                </div>
            </div>
        </template>

        <template v-slot:button>

        </template>

    </FormComponent>

    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>

import axios from 'axios'
import FormComponent from '../FormsComponents/FormComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import InputComponent from '../FormsComponents/InputComponent.vue'

import PopupMessageComponent from '../PopupMessageComponent.vue'

export default {
    name: 'CreateNewListsCampaign',
    data() {
        return {
            text: 'Create New Lists',
            stepCount: 1,
            formData: {
                folderName: '',
                emailLists: '',
                folderRef: ''
            },
            formIsCompleted: false,
            listIsCreated: false,
            statusText: 'error',
            popupMessage: ''
        }
    },

    props: {
        folderName: '',
        emailLists: '',
        folderRef: '',
        editableFormData: {
            type: Object,
            default: {}
        },
        requestType: {
            type: String,
            default: 'create'
        }
    },

    mounted() {
        if ( this.requestType === 'update' ) {
            this.formData.folderName = this.editableFormData.name
            this.formData.emailLists = this.editableFormData.emails.join(', ')
            this.formData.folderRef = this.editableFormData.folderRef
            this.text = 'Update ' + this.formData.folderName
            this.stepCount = 2
        }
    },

    methods: {
        getFolderName(value) {
            this.formData.folderName = value
        },
        async createOrUpdateListRequest() {
            this.popupMessage = ''
            try {
                let __response = ''
                if ( this.requestType === 'create' ) {
                     __response = await axios.post('/lists', this.formData, {
                        'Accept': 'application/json'
                    })
                }
                else {

                    __response = await axios.patch('/lists', this.formData, {
                        'Accept': 'application/json'
                    })
                }


                if (__response.request.status === 201) {
                    this.statusText = 'success'
                    this.popupMessage = 'List Has Been Created Succesfully'


                    if ( this.requestType === 'create' ) {

                        // remove all formData
                        this.formData = {};
                        this.stepCount = 1
                    }
                    else {
                        this.popupMessage = 'List has been updated Successfully'
                    }
                    this.$emit('triggerUpload', true)

                    setTimeout(() => {
                        this.$emit('removeComponent', true)
                    }, 3200);

                }

            } catch (error) {
                error = JSON.parse(error.response.request.response)
                this.statusText = 'error'
                this.popupMessage = error.message
            }
        }
    },
    components: { FormComponent, InputComponent, ButtonComponent, PopupMessageComponent }
}
</script>

<style lang="scss" scoped></style>