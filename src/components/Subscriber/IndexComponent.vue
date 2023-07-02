<template>
   
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-3xl font-Poppins font-semibold">{{ title }}</h2>
    </div>

    <!-- Load all Scheduled Emails -->
    <SubscribersTableComponent @getTitle="setTitle"  @getMessage="setMessage" @getStatusText="setStatusText"/>


    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>
import PopupMessageComponent from '../PopupMessageComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'


import SubscribersTableComponent from './SubscribersTableComponent.vue'
export default {
    name: 'ScheduleComponent',
    data() {
        return  {
            popupMessage: '',
            statusText: '',
            title: 'Subscribers'
        }
    },
    methods: {
        setProfilePicsUrl(value) {

        },

        setMessage(value) {
            this.popupMessage = value
        },

        setStatusText(value) {
            this.statusText = value
        },

        setTitle(value) {
            if ( value !== '' ) {
                this.title = value
            }
        }
    },
    components: { PopupMessageComponent, ButtonComponent, SubscribersTableComponent },
    
}
</script>

<style lang="scss" scoped></style>