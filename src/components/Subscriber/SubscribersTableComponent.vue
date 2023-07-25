<template>
    <div class="p-5 pb-0">

        <div class="block p-3 px-2 pb-0">
            <ButtonComponent v-if="!this.isOnCreateComponent"
                @click="this.importedComponent = 'SubscribersCreateComponent'; this.isOnCreateComponent = !this.isOnCreateComponent"
                class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                Add New Subscriber</ButtonComponent>

                <ButtonComponent v-if="this.isOnCreateComponent"
                @click="this.importedComponent = 'SubscribersAllComponents'; this.isOnCreateComponent = !this.isOnCreateComponent"
                class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                View all Subscribers</ButtonComponent>

                <div class="flex py-2 space-x-3 gap-2">
                    <ButtonComponent 
                        @click="this.importedComponent = 'WelcomeEmailComponent'"
                        class="px-5 hover:border-slate-600 hover:text-slate-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-slate-600 text-white">
                        Set Default Welcome Email</ButtonComponent>


                        <ButtonComponent 
                            @click="this.importedComponent = 'UnsubscribeEmailComponent'"
                        class="px-5 hover:border-slate-600 hover:text-slate-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-slate-600 text-white">
                        Set Default Unsubscribe Message</ButtonComponent>
                </div>
            
        </div>


        <!-- Unique Subscribers Link -->
        <span class="block w-full font-normal font-Montserrat py-3">Use this link to collect emails subscribers : <a
                class="underline underline-offset-1 hover:text-blue-700"
                :href="createNewSubscriberLink" target="_blank">{{ createNewSubscriberLink }}</a></span>

        <div class="md:p-3 md:pb-0">
            <component :templates="templates" @getTitle="setTitle" @getMessage="setMessage" @getStatusText="setStatusText" @closeComponent="closeComponent" :is="this.importedComponent" @createSubscriberLink="setSubscribersCreateLink"></component>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import SubscribersAllComponents from './SubscribersAllComponents.vue'
import SubscribersCreateComponent from './SubscribersCreateComponent.vue'
import WelcomeEmailComponent from './WelcomeEmailComponent.vue'
import UnsubscribeEmailComponent from './UnsubscribeEmailComponent.vue'

window.ResizeObserver = ResizeObserver;
export default {
    name: 'SubscribersTableComponent',
    data() {
        return {
            importedComponent: 'SubscribersAllComponents',
            isOnCreateComponent: false,
            templates: [],
            createNewSubscriberLink: ''
        }
    },
    methods: {
        setStatusText(value) {
            this.$emit('getStatusText', value);

        },

        closeComponent(value) {
            if ( value === 'true' ) {
                this.importedComponent = 'SubscribersAllComponents'
            }
        },  

        setSubscribersCreateLink(value) {
            if ( value !== "" ) {
                this.createNewSubscriberLink = value
            }
        },

        setMessage(value) {
            this.$emit('getMessage', value);
        },
        setTitle(value) {
            if ( value !== '' ) {
                this.$emit('getTitle', value)
            }
        }
    },
    async mounted() {
        this.$emit('getTitle', '')
        let __response = await axios.get('/templates/subscribers');
        if ( __response.status === 200 ) {
            this.templates = __response.data.data

        }

    },
    components: { ButtonComponent, SubscribersAllComponents, SubscribersCreateComponent, WelcomeEmailComponent, UnsubscribeEmailComponent }
}
</script>

<style lang="scss">
.popup_container {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #808080ab;
    width: 100%;
    height: 100vh;
    z-index: 999;
}</style>