<template>
    <div class="p-5">

        <teleport to='#popup'>

            <div v-if="this.formMainComponent !== ''" class="popup_container flex place-content-center place-items-center">
                <div class="relative bg-white p-2 px-4 rounded min-w-[500px] max-w-[500px]">
                    <component @removeComponent="this.formMainComponent=''" @triggerEdit="getEditableComponent" @triggerUpload="reloadContents" :folderRef="this.selectedFolderRef" :folderName="this.selectedFolderName" :requestType="listsRequestType" :emailLists="this.emailLists" :is="this.formMainComponent" :editableFormData="editableFormData"></component>

                    <!-- Close Button -->
                    <span @click="this.formMainComponent = ''"
                        class="flex absolute top-3 right-2 cursor-pointer align-center justify-center">
                        <svg fill="none" class="w-8 h-8" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </teleport>

        <ButtonComponent class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 block my-2 text-white" @click="this.formMainComponent = 'CreateNewListsCampaign'; this.listsRequestType = 'create'">Create New Lists</ButtonComponent>

        <section v-if="this.foldersLists.length > 0" data-simplebar class="flex flex-col spaxe-x-3 py-4">
            <div class="w-full overflow-x-auto">


                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr
                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                            <th class="px-4 py-3">Id</th>
                            <th class="px-4 py-3">Folder Name</th>
                            <th class="px-4 py-3">Total Emails</th>
                            <th class="px-4 py-3">Created</th>
                            <th class="px-4 py-3">View</th>
                            <th class="px-4 py-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y">
                        <tr v-for="(folder, index) in foldersLists" :key="folder.folderRef" class="text-gray-700 text-sm">
                            <td class="px-4 py-3">{{ index+1 }}</td>
                            <td class="px-4 py-3 capitalize">
                                {{ folder.name }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ folder.emails }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ folder.createdAt }}
                            </td>

                            <td class="px-4 py-3 text-left text-xs">
                                <!-- View Template Button -->
                                <span :folderRef="folder.folderRef" @click="getAllEmails(folder.folderRef)"
                                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full cursor-pointer single_mail"><i
                                        class="fas fa-eye"></i>&nbsp; View Emails </span>
                            </td>

                            <td class="px-4 py-3 text-sm">
                                <div class="flex gap-1 w-max">
                                    <span @click="getEditableComponent(folder.folderRef)"
                                        class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-green-700 bg-green-100 rounded-full hover:bg-green-700 hover:text-green-100">
                                        <i class="fas fa-pen"></i>
                                    </span>
                                    <span @click="triggerDeleteAction(folder.folderRef)"
                                        class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-red-700 bg-red-100 rounded-full hover:bg-red-700 hover:text-red-100">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

         <div v-else class="text-gray-600 text-2xl h-[200px] flex place-content-center place-items-center">
            No Record Found
        </div>
    </div>

    <!-- Popup Message -->
    <component v-if="this.popupMessage !== ''" :is='messageComponent' :popupMessage="this.popupMessage" :statusText="this.statusText"></component>
</template>

<script>
import axios from 'axios'

import CreateNewListsCampaign from './CreateNewListsComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import ViewEmailsComponent from './ViewEmailsComponent.vue'

import PopupMessageComponent from '../PopupMessageComponent.vue'

export default {
    name: 'EmailListsTableComponents',
    data() {
        return {
            foldersLists: [
                
            ],
            popupMessage: '',
            messageComponent: '',
            statusText: 'error',
            emailLists: [],
            selectedFolderName: '',
            selectedFolderRef: '',
            formMainComponent: '',
            editableFormData: {},
            listsRequestType: 'create'
        }
    },

    components: {CreateNewListsCampaign, ButtonComponent, ViewEmailsComponent, PopupMessageComponent},

    methods: {
        async getEditableComponent(folderRef) {

            this.popupMessage = this.messageComponent = ''
            this.listsRequestType = 'update'
            try {
                let __response = await axios.get(`/lists/${folderRef}`);

                if ( __response.status === 200 && __response.statusText !== 'error' ) {
                    // Load Editable Form Components
                    this.editableFormData = __response.data.data   
                    this.formMainComponent = 'CreateNewListsCampaign'

                }
            } catch( error ) {
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                this.messageComponent = 'PopupMessageComponent'

            }
        },
        async reloadContents() {
            this.getAllLists();
        },

        async getAllLists() {
            this.popupMessage = this.messageComponent = ''
            try {

                let __response = await axios.get('/lists');
                if ( __response.status === 200 && __response.statusText !== 'error' ) {
                    if ( Array.isArray( __response.data.data ) ) {
                        this.foldersLists = __response.data.data;
                        this.foldersLists = this.foldersLists.filter( (e) => {
                            return e.folderRef !== ''
                        } )
                    }
                }
            } catch( error ) {
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                this.messageComponent = 'PopupMessageComponent'

            }
        },
        
        async getAllEmails(folderRef) {
            this.messageComponent = this.popupMessage = ''
            await axios.get(`lists/${folderRef}/emails`).then((response) => {
                    this.emailLists = response.data.emails
                    this.selectedFolderName = response.data.name
                    this.selectedFolderRef = response.data.folderRef
                    this.formMainComponent = 'ViewEmailsComponent'

                }).catch((error) => {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                    this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                    this.messageComponent = 'PopupMessageComponent'
                });
        },


        async triggerDeleteAction(folderRef) {

            // Remove this line if you get vnode type when creating type error from console
            this.messageComponent = this.popupMessage = ''
            await axios.delete(`lists/${folderRef}/delete`).then((response) => {
                if ( response.status === 200 ) {
                    // List has been deleted succesfully
                    this.popupMessage = 'List Deleted Successfully'
                    this.statusText = 'success'
                    this.foldersLists = this.foldersLists.filter((e) => {
                        return e.folderRef !== folderRef
                    })
                    
                }
                else {
                    this.popupMessage = 'Invalid Request'
                }
                this.messageComponent = 'PopupMessageComponent'

            }).catch((error) => {
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                this.messageComponent = 'PopupMessageComponent'
            });
        }
    },

    async created() {
        // Get all Email Lists
       this.getAllLists();
    }
}
</script>

<style scoped></style>