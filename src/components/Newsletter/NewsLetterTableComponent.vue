<template>
    <div class="p-5">
        <teleport to='#popup'>

            <div v-if="this.formMainComponet !== ''" class="popup_container flex place-content-center place-items-center">
                <div class="relative bg-white p-2 px-4 rounded min-w-[300px] max-w-[300px] sm:min-w-[500px] sm:max-w-[500px]">
                    <component @closeForm="triggerCloseForm" :is="this.formMainComponet" :id="this.id"></component>

                    <!-- Close Button -->
                    <span @click="this.formMainComponet = ''"
                        class="flex absolute top-3 right-2 cursor-pointer align-center justify-center">
                        <svg fill="none" class="w-8 h-8" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                </div>
            </div>

        </teleport>

        <router-link :to="{name: 'admin-newsletter-create'}" class="px-5 block hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">Create New Newsletter</router-link>
       


        <section v-if="this.newsletters.length > 0" data-simplebar class="flex flex-col h-[500px] overflow-auto spaxe-x-3 py-4">
            <div class="w-full overflow-x-auto">


                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr
                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                            <th class="px-4 py-3">Id</th>
                            <th class="px-4 py-3">Name</th>
                            <th class="px-4 py-3">Sent to</th>
                            <th class="px-4 py-3">Lists</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Created</th>
                            <th class="px-4 py-3">View/Delete</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y ">
                        <tr v-for="(newsletter, index) in newsletters" :key="newsletter.id" class="text-gray-700">
                            <td class="px-4 py-3">{{ index +1 }}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center text-sm">
                                    <p class="font-semibold text-left">{{ newsletter.name }}</p> 
                                </div>
                            </td>
                            <td class="px-4 py-3 text-xs">
                                <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full ">{{ newsletter.sentTo }}</span>
                                
                            </td>
                            <td class="px-4 py-3 text-xs">
                                <span v-if="newsletter.lists !== null" class="px-2 py-1 font-semibold leading-tight capitalize text-yellow-700 bg-blue-100 rounded-full ">{{ newsletter.lists }}</span>
                                <span v-else class="px-2 py-1 font-semibold leading-tight capitalize text-red-700 bg-red-100 rounded-full">Invalid Lists</span>
                                
                            </td>
                            <td class="px-4 py-3 text-xs">
                                
                                <span
                                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full single_mail">&nbsp; {{ newsletter.status }}
                            </span>
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ newsletter.createdAt }}
                            </td>

                            

                            <td class="px-4 py-3 text-sm">
                                <div class="flex gap-1 w-max">
                                    <router-link :to="{name: 'admin-newsletter-show', params: {id: newsletter.id}}" class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-green-700 bg-green-100 rounded-full hover:bg-green-700 hover:text-green-100"><i class="fas fa-eye"></i></router-link>
                                    <span @click="deleteNewsLetter(newsletter.id)" class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-red-700 bg-red-100 rounded-full hover:bg-red-700 hover:text-red-100">
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
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>

import CreateNewNewsLetterComponent from '@/components/Newsletter/CreateNewNewsLetterComponent.vue'
import ButtonComponent from '@/components/Auth/ButtonComponent.vue'
import PopupMessageComponent from '@/components/PopupMessageComponent.vue'
import axios from 'axios'


export default {
    name: 'NewsletterTableComponent',
    data() {
        return {
            newsletters: [],
            formMainComponet: '',
            popupMessage: '',
            statusText: '',
            id: null
        }
    },
    methods: {
        showFormComponent() {
            this.formMainComponet = 'CreateNewNewsLetterComponent'
        },


        // Trigger Close form action
        triggerCloseForm(value) {

            alert('Hit Here')
            if ( value ) {
                setTimeout(() => {
                    this.formMainComponet = ''
                }, 5000);
            }
        },

    

        /**
         * Delete Newsletter 
         */
        async deleteNewsLetter(id) {
            this.statusText = this.popupMessage = ''
            if ( id !== "" && id !== undefined ) {
                try {
                    let __response = await axios.delete('/newsletters/'+id);
                    if ( __response.status === 201 ) {
                        this.statusText = 'success'
                        this.popupMessage = __response.data.message

                        this.newsletters = this.newsletters.filter((e) => {
                            return e.id !== id
                        })
                    }
                } catch( error ) {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                    this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                }
            }
        },

        
    },
    components: { CreateNewNewsLetterComponent, ButtonComponent, PopupMessageComponent },

    async mounted() {
        try {
            let __response = await axios.get('/newsletters');
            if ( __response.status === 200 ) {
                this.newsletters = __response.data.data
            }
        }catch(error) {
            this.statusText = 'error'
            let serverErrorMessage = (error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
            this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
        }
    }
}
</script>

<style lang="scss">.popup_container {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #808080ab;
    width: 100%;
    height: 100vh;
    z-index: 999;
}</style>