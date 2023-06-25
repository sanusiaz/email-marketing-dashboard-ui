<template>
    <div class="p-5">
        <teleport to='#popup'>

            <div v-if="this.formMainComponet !== ''" class="popup_container flex place-content-center place-items-center">
                <div class="relative bg-white p-2 px-4 rounded min-w-[300px] max-w-[300px] sm:min-w-[500px] sm:max-w-[500px]">
                    <component :is="this.formMainComponet"></component>

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
       


        <section data-simplebar class="flex flex-col h-[500px] overflow-auto spaxe-x-3 py-4">
            <div class="w-full overflow-x-auto">


                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr
                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th class="px-4 py-3">Id</th>
                            <th class="px-4 py-3">Campaign</th>
                            <th class="px-4 py-3">Total</th>
                            <th class="px-4 py-3">Sent</th>
                            <th class="px-4 py-3">Queued</th>
                            <th class="px-4 py-3">Sent to</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Created</th>
                            <th class="px-4 py-3">Template</th>
                            <th class="px-4 py-3">Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr v-for="campaign in campaigns" :key="campaign.id" class="text-gray-700 dark:text-gray-400">
                            <td class="px-4 py-3">{{ campaign.id }}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center text-sm">
                                    <!-- Avatar with inset shadow -->

                                    <a href="#" class="cursor-pointer hover:underline">
                                        <p class="font-semibold text-left">{{ campaign.name }}</p>
                                        <p class="text-xs text-gray-600 dark:text-gray-400">
                                            Type: {{ campaign.type }}
                                            &nbsp; <i class="fas fa-external-link-alt"></i>
                                        </p>
                                    </a>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.totalEmails }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.sentEmail }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.queuedEmail }}
                            </td>
                            <td class="px-4 py-3 text-xs">
                                <a :href="campaign.folderViewLink"  class="px-2 py-1 cursor-pointer font-semibold leading-tight text-yellow-700 hover:underline bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-green-100">
                                    Subscribers...
                                </a>
                            </td>
                            <td class="px-4 py-3 text-xs">
                                <span
                                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 single_mail">&nbsp; Sending...
                            </span>
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ campaign.createdAt }}
                            </td>

                            <td class="px-4 py-3 text-left text-xs">
                                <!-- View Template Button -->
                                <a :href="campaign.templateLink"  class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 single_mail"><i class="fas fa-eye"></i>&nbsp; View Template </a>
                            </td>

                            <td class="px-4 py-3 text-sm">
                                <div class="flex gap-1 w-max">
                                    <span class="text-white cursor-pointer transition-all duration-200 hover:duration-200 border border-transparent hover:bg-white hover:text-green-600 hover:border-green-600 w-max m-auto relative flex align-center justify-center bg-green-600 text-sm rounded-lg p-2">
                                        <i class="fas fa-pen"></i>
                                    </span>
                                    <span class="text-white cursor-pointer transition-all duration-200 hover:duration-200 border border-transparent hover:bg-white hover:text-red-600 hover:border-red-600 w-max m-auto relative flex align-center justify-center bg-red-600 text-sm rounded-lg p-2">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script>

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
import CreateNewCampaignComponent from './CreateNewCampaignComponent.vue'

import ButtonComponent from '../Auth/ButtonComponent.vue'
window.ResizeObserver = ResizeObserver;
export default {
    name: 'CampaignTableComponent',
    data() {
        return {
            campaigns: [
                { id: 1, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 2, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 3, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 4, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 5, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 6, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 7, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 8, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 9, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 10, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 11, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 12, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 13, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 14, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 15, name: 'Some campaign name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' }
            ],
            formMainComponet: ''
        }
    },
    methods: {
        showFormComponent() {
            this.formMainComponet = 'CreateNewCampaignComponent'
        }
    },
    components: { CreateNewCampaignComponent, ButtonComponent }
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