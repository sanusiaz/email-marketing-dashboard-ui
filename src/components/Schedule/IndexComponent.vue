<template>
    <div>
        <div>

            <Sidebar active="schedule" />

            <!-- Content Area -->
            <div class="relative md:ml-64 bg-slate-100">
                <Header @profilePicsUrl="setProfilePicsUrl" :title="title"></Header>
                <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
                    <div class="main_contents pt-32 px-10">
                        <h2 class="text-black text-3xl font-Poppins font-semibold">All Schedule Mails</h2>
                    </div>

                    <!-- Load all Scheduled Emails -->
                    <ScheduleTableComponent @getMessage="setMessage" @getStatusText="setStatusText"/>

                </div>

                <Footer></Footer>

            </div>
        </div>
    </div>


    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>
import axios from 'axios'
import Sidebar from '../Dashboard/Includes/Sidebar.vue'
import Header from '../Dashboard/Includes/Header.vue'
import Overview from '../Dashboard/Overview.vue'
import PopupMessageComponent from '../PopupMessageComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'

import Footer from '../Dashboard/Includes/Footer.vue'

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
        setProfilePicsUrl(value) {

        },

        setMessage(value) {
            this.popupMessage = value
        },

        setStatusText(value) {
            this.statusText = value
        }
    },
    components: { PopupMessageComponent, ButtonComponent, Overview, Sidebar, Header, Footer, ScheduleTableComponent }
}
</script>

<style lang="scss" scoped></style>