<template>
   
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-3xl font-Poppins font-semibold">All Schedule Mails</h2>
    </div>

    <!-- Load all Scheduled Emails -->
    <ScheduleTableComponent @getMessage="setMessage" @getStatusText="setStatusText"/>

              

    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>
import axios from 'axios'
import PopupMessageComponent from '../PopupMessageComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'


import ScheduleTableComponent from './ScheduleTableComponent.vue'
export default {
    name: 'ScheduleComponent',
    data() {
        return  {
            title: 'Scheduled Mesages',
            popupMessage: '',
            statusText: ''
        }
    },
    methods: {
        setMessage(value) {
            this.popupMessage = value
        },

        setStatusText(value) {
            this.statusText = value
        }
    },
    components: { PopupMessageComponent, ButtonComponent, ScheduleTableComponent }
}
</script>

<style lang="scss" scoped></style>