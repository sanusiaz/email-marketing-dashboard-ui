<template>
    <section v-if="this.subscribers.length > 0" data-simplebar class="flex flex-col h-[500px] overflow-auto spaxe-x-3 py-4">
        <div class="w-full overflow-x-auto">


            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">Id</th>
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Email</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Joined</th>
                        <th class="px-4 py-3">Send Message</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr v-for="(subscriber, index) in subscribers" :key="subscriber.id" class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3">{{ index+1 }}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <p class="font-semibold text-left">{{ subscriber.name }}</p>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm capitalize">
                            {{ subscriber.email }}
                        </td>
                        <td class="px-4 py-3 text-xs">
                            <span
                                class="px-2 py-1 font-semibold leading-tight rounded-full dark:bg-green-700 dark:text-green-100 single_mail" :class="( subscriber.unSubscribed ) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700' ">&nbsp;
                                {{ (subscriber.unSubscribed) ? 'unSubscribed' : 'Subscribed' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            {{ subscriber.joinedAt }}
                        </td>

                        <td class="px-4 py-3 text-left text-xs">
                            <!-- Message Button -->
                            <a :href="subscriber.id" @click="this.loadSingleEmailPopup = true; this.singleEmail = subscriber.email; this.FormComponent = 'SingleSubscriberMailComponent'" title="click to view template used"
                                class="px-2 py-1 font-semibold cursor-pointer hover:underline leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 single_mail"><i
                                    class="fas fa-paper-plane"></i>&nbsp; Message </a>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>


        <!-- Popup Section -->
        <teleport to='#popup'>

            <div v-if="this.loadSingleEmailPopup" class="popup_container flex place-content-center place-items-center">
                <div class="relative bg-white p-2 px-4 rounded min-w-[500px] max-w-[500px]">
                    <SingleSubscriberMailComponent @closeForm="exitForm" :templates="templates" :selectedEmail="this.singleEmail" />
                    <!-- Close Button -->
                    <span @click="this.loadSingleEmailPopup = false; this.FormComponent = ''"
                        class="flex absolute top-3 right-2 cursor-pointer align-center justify-center">
                        <svg fill="none" class="w-8 h-8" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </teleport>

    </section>

    <div v-else class="text-gray-600 text-2xl h-[200px] flex place-content-center place-items-center">
        No Record Found
    </div>

    
</template>

<script>
import axios from 'axios'
import SingleSubscriberMailComponent from  './SingleSubscriberMailComponent.vue'
export default {
    name: 'SubscribersAllComponents',

    data() {

        return  {

            subscribers: [
            ],
            loadSingleEmailPopup: false,
            singleEmail: '',
            FormComponent: ''
        }
    },
    props: {
        templates: {
            type: Array,
            default: []
        }
    },

    async created() {
        await axios.get('/subscribers?includesCreateLink=true')
            .then(res => {
                if ( res.status === 200 ) {
                    console.log(res.data)
                    this.subscribers = res.data.data

                    if ( res.data.createSubscriberLink !== undefined ) {
                        this.$emit('createSubscriberLink', res.data.createSubscriberLink)
                    }
                }
            })
            .catch( error => {

                if (error.response.data.message !== undefined && error.response.data.message !== "") {
                    this.$emit('getMessage', error.response.data.message)
                }
                else {
                    this.$emit('getMessage', 'Internal Server Error')
                }
                console.error(error.response.data.message)
                this.$emit('getStatusText', 'error')
            })
    },

    components: {SingleSubscriberMailComponent},

    methods: {
        exitForm(value) {
            if ( value === true ) {
                this.FormComponent = ''
                this.loadSingleEmailPopup = false
            }
        }
    }

}
</script>

<style lang="scss" scoped></style>