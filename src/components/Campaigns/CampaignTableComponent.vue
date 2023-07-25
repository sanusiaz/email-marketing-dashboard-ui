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

        <ButtonComponent class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white" @click="showFormComponent()">Create New Campaign</ButtonComponent>
       


        <section v-if="this.campaigns.length > 0" data-simplebar class="flex flex-col h-[500px] overflow-auto spaxe-x-3 py-4">
            <div class="w-full overflow-x-auto">


                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr
                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th class="px-4 py-3">Id</th>
                            <th class="px-4 py-3">Campaign</th>
                            <th class="px-4 py-3">Total Emails</th>
                            <th class="px-4 py-3">Sent Emails</th>
                            <th class="px-4 py-3">Sent to</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Created</th>
                            <th class="px-4 py-3">View / Delete</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr v-for="(campaign, index) in campaigns" :key="campaign.id" class="text-gray-700 dark:text-gray-400">
                            <td class="px-4 py-3">{{ index +1 }}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center text-sm">
                                    <a href="#" class="cursor-pointer hover:underline">
                                        <p class="font-semibold text-left">{{ campaign.name }}</p>
                                        
                                    </a>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.totalEmail }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.sentEmail }}
                            </td>
                            <td class="px-4 py-3 text-xs">
                                <span   class="px-2 py-1 font-semibold leading-tight text-yellow-700  bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-green-100">
                                    {{ campaign.sentTo }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-xs">
                                
                                <span
                                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 w-max">{{ campaign.status }}</span>
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.createdAt }}
                            </td>

                           
                            <td class="px-4 py-3 text-sm">
                                <div class="flex gap-1 w-max">
                                    <!-- View Message Button -->
                                    <span @click="viewMessage(campaign.id)"  class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-green-700 bg-green-100 rounded-full hover:bg-green-700 hover:text-green-100"><i class="fas fa-eye"></i></span>
                                    
                                    <span @click="deleteCampaign(campaign.id)" class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-red-700 bg-red-100 rounded-full hover:bg-red-700 hover:text-red-100">
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

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import CreateNewCampaignComponent from '@/components/Campaigns/CreateNewCampaignComponent.vue'
import viewMessageComponent from '@/components/Campaigns/viewMessageComponent.vue'
import ButtonComponent from '@/components/Auth/ButtonComponent.vue'
import PopupMessageComponent from '@/components/PopupMessageComponent.vue'
import axios from 'axios'


export default {
    name: 'CampaignTableComponent',
    data() {
        return {
            campaigns: [],
            formMainComponet: '',
            popupMessage: '',
            statusText: '',
            id: null
        }
    },
    methods: {
        showFormComponent() {
            this.formMainComponet = 'CreateNewCampaignComponent'
        },

        async getAllCampaigns() {
            try {
                let __response = await axios.get('/campaigns');
                if ( __response.status === 200 ) {
                    this.campaigns = __response.data.data
                }
            }catch(error) {
                this.popupMessage = 'Internal Server Error. Please Contact Admin.'
                this.statusText = 'error'
            }
        },

        // Trigger Close form action
        triggerCloseForm(value) {
            if ( value || value === '' ) {
                setTimeout(() => {
                    this.formMainComponet = ''
                    this.getAllCampaigns()

                    // To Only Add the created data to the top of the result Just Uncomment the line below
                    // this.campaigns.unshift(value)
                }, 5000);
            }
        },
        async deleteCampaign(id) {
            this.statusText = this.popupMessage = ''
            if ( id !== "" && id !== undefined ) {
                try {
                    let __response = await axios.delete('/campaigns/'+id);
                    if ( __response.status === 201 ) {
                        this.statusText = 'success'
                        this.popupMessage = __response.data.message

                        this.campaigns = this.campaigns.filter((e) => {
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

        async viewMessage(id) {
            this.id = id
            this.formMainComponet = 'viewMessageComponent'           
        }
    },
    components: { CreateNewCampaignComponent, ButtonComponent, PopupMessageComponent, viewMessageComponent },

    async mounted() {
        this.getAllCampaigns()
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